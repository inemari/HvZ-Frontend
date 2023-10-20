import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import CustomButton from "../common/CustomButton";

const ChatComponent = ({ hubConnection, isMember }) => {
  const [newMessage, setNewMessage] = useState("");
  const [lobby, setLobby] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || "Mr.Default"
  );
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (username) {
        setUsers((prevUsers) => prevUsers.filter((user) => user !== username));
        sessionStorage.removeItem("username");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username]);

  useEffect(() => {
    if (hubConnection && lobby) {
      setUsers([]);

      const userUpdatedHandler = (userList) => {
        setUsers(userList);
      };

      hubConnection.on("UserListUpdated", userUpdatedHandler);

      return () => {
        hubConnection.off("UserListUpdated", userUpdatedHandler);
      };
    }
  }, [hubConnection, lobby]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ReceiveMessage", (user, message, roomName) => {
        setReceivedMessages([...receivedMessages, `${user}: ${message}`]);
      });
    }
  }, [hubConnection, receivedMessages]);

  const sendMessage = () => {
    if (hubConnection && hubConnection.state === signalR.HubConnectionState.Connected && newMessage && username && lobby) {
      hubConnection
        .invoke("SendMessage", username, newMessage, lobby)
        .catch((error) => {
          console.error("Error sending message: " + error);
        });

      setNewMessage("");
    }
  };

  const changeLobby = (newLobby) => {
    if (hubConnection && hubConnection.state === signalR.HubConnectionState.Connected) {
      if (lobby) {
        hubConnection
          .invoke("LeaveRoom", lobby, username)
          .catch((error) => {
            console.error("Error leaving the lobby: " + error);
          });
      }

      hubConnection
        .invoke("JoinRoom", newLobby, username)
        .catch((error) => {
          console.error("Error joining the lobby: " + error);
        });

      const updatedUsers = [...users, username];
      setUsers(updatedUsers);
    }

    setLobby(newLobby);
    setReceivedMessages([]);
    setShowMenu(false);
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    sessionStorage.setItem("username", newUsername);
  };

  return (
    <div className="relative h-screen">
      <div className="bottom-10 fixed right-4 w-72 bg-customLightBrown rounded-lg p-2">

        {/* menu popping up after clicking chat */}
        {showMenu && (
          <div className="lobby-options p-2 rounded grid grid-flow-row gap-2">
            <CustomButton
              onClick={() => changeLobby("Global Chat")}
              label={"Global chat"}
            >

            </CustomButton>
            <CustomButton
              onClick={() => changeLobby("Zombies Chat")}
              label={"Zombies Chat"}
            >

            </CustomButton>
            <CustomButton
              onClick={() => changeLobby("Humans Chat")}
              label={"Human Chat"}
            >
            </CustomButton>
            {isMember && (
              <CustomButton
                onClick={() => changeLobby("Squad Chat")}
                label={"Squad Chat"}
              >
              </CustomButton>
            )}
          </div>
        )}

        {/* username input-field and chat-button */}
        <div className="flex flex-row w-full"><input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
          className=" p-2 text-black rounded w-full"
        />
          <CustomButton
            onClick={() => setShowMenu(!showMenu)}
            className="chat-button bg-customBrown rounded"
            label={"Chat"}
          >

          </CustomButton> </div>
      </div>
      {/*The chat window*/}
      {lobby && (

        <div className=" right-0 fixed w-72 bg-white rounded-xl shadow-xl">

          <h1 className="p-3 bg-customOrange w-full rounded-t-xl">{lobby}</h1>
          <div className="p-3">
            {isConnected &&
              <div className="online-dot bg-green-500 w-3 h-3 rounded-full"></div>}

            {/* list of users that are online inside chatwindow*/}
            <div className="user-list">
              <p>Online Users:</p>
              <ul>
                {users.map((user) => (
                  <li key={user}>{user}</li>
                ))}
              </ul>
            </div>

            {/* messages inside chatwindow*/}
            <div className="h-40 border border-customBrown p-2 overflow-y-auto mb-4 bg-gray-100 rounded" ref={chatContainerRef}>
              {receivedMessages.map((message, index) => (
                <div key={index} className="mb-2 ">
                  {message}
                </div>
              ))}
            </div>
            <input
              type="textarea"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="border border-customBrown p-2 w-full mb-2 rounded"
            />
            <CustomButton
              onClick={sendMessage}
              label="Send"
            />

          </div></div>
      )}
    </div>
  );
};

export default ChatComponent;
