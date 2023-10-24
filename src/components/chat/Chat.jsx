import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";

const ChatComponent = ({ hubConnection, isMember }) => {
  // State variables for managing chat functionality
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
     // Handle actions before the window/tab is unloaded
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
    // Update user list when the hubConnection or lobby changes
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
     // Receive and display messages from the hub
    if (hubConnection) {
      hubConnection.on("ReceiveMessage", (user, message, roomName) => {
        setReceivedMessages([...receivedMessages, `[${user}] : ${message}`]);
      });
    }
  }, [hubConnection, receivedMessages]);

  const sendMessage = () => {
     // Send a message if conditions are met
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
    // Change the lobby and handle user actions
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
    // Handle username change and save it in sessionStorage
    const newUsername = e.target.value;
    setUsername(newUsername);
    sessionStorage.setItem("username", newUsername);
  };

  return (

    <div className="h-fit w-fit m-auto max-w-xs ">

      {lobby && (

        <div className="mb-2">
          <h1 className="p-3 bg-customOrange w-full text-lg font-medium text-white text-center rounded-t-xl">{lobby}</h1>
          {/* list of users that are online inside chatwindow*/}

          <div className="grid grid-flow-row gap-2 p-2 text-white bg-customLightBrown rounded-b-xl ">

            {/* messages inside chatwindow*/}
            <div className="h-40 border border-customBrown p-2 overflow-y-auto  bg-customBrown rounded" ref={chatContainerRef}>
              {receivedMessages.map((message, index) => (
                <div key={index} className="mb-2 ">
                  <b>{message}</b>
                </div>
              ))}
            </div>
            <CustomInput
              textComponent="input"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <CustomButton
              onClick={sendMessage}
              label="Send"
            />

          </div></div>
      )
      }

      {/* menu popping up after clicking chat */}
      {
        showMenu && (
          <div className="lobby-options py- rounded grid grid-flow-row gap-2 pb-2 ">
            <CustomButton
              onClick={() => changeLobby("Global Chat")}
              label={"Global chat"}
            />
            <CustomButton
              onClick={() => changeLobby("Zombies Chat")}
              label={"Zombies Chat"}
            />
            <CustomButton
              onClick={() => changeLobby("Humans Chat")}
              label={"Human Chat"}
            >
            </CustomButton>
            {isMember && (
              <CustomButton
                onClick={() => changeLobby("Squad Chat")}
                label={"Squad Chat"}
              />
            )}
          </div>
        )
      }

      {/* username input-field and chat-button */}
      <div className="flex flex-row space-x-1 pb-2 px-2 bg-customLightBrown rounded-lg justify-center ">

        <CustomInput
          textComponent="input"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="my-auto "
        />
        <div className="justify-center pt-2 w-1/3">
          <CustomButton
            onClick={() => setShowMenu(!showMenu)}
            label={"Chat"}
          ></CustomButton></div>

      </div>

    </div >
  );
};

export default ChatComponent;
