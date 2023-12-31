import React, { useState, useEffect, useRef } from "react";
import * as signalR from "@microsoft/signalr";
import CustomButton from "../common/CustomButton";
import CustomInput from "../common/CustomInput";

// ChatComponent displays a chat interface for users to communicate in a lobby.
// Props:
// - hubConnection: The SignalR hub connection.
// - isMember: Indicates if the user is a member of the lobby.
// - isZombie: Indicates if the user is a zombie in the lobby.
const ChatComponent = ({ hubConnection, isMember, isZombie }) => {
  // State variables
  const [newMessage, setNewMessage] = useState("");
  const [lobby, setLobby] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || "Mr.Default"
  );

  // Reference to the chat container
  const chatContainerRef = useRef(null);

  // Handle user data before unloading the page
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

  // Set up user list when hub connection and lobby are established
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

  // Listen for incoming messages
  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ReceiveMessage", (user, message, roomName) => {
        setReceivedMessages([...receivedMessages, `[${user}] : ${message}`]);
      });
    }
  }, [hubConnection, receivedMessages]);

  // Send a chat message
  const sendMessage = () => {
    if (
      hubConnection &&
      hubConnection.state === signalR.HubConnectionState.Connected &&
      newMessage &&
      username &&
      lobby
    ) {
      // Check if the player is not a zombie before sending the message
      if (!isZombie) {
        hubConnection
          .invoke("SendMessage", username, newMessage, lobby)
          .catch((error) => {
            console.error("Error sending message: " + error);
          });
      } else {
        console.log("Zombies cannot send messages.");
      }
      setNewMessage("");
    }
  };

  // Handle sending messages on Enter key press
  const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    // Enter key SEND MESSAGE
    sendMessage();
    // Reset the input field
    setNewMessage("");
  }
  };
  
  // Change the lobby
  const changeLobby = (newLobby) => {
    if (hubConnection && hubConnection.state === signalR.HubConnectionState.Connected) {
      if (lobby) {
        // Leave the current lobby if the user is in one
        hubConnection
          .invoke("LeaveRoom", lobby, username)
          .catch((error) => {
            console.error("Error leaving the lobby: " + error);
          });
      }
      // Join the new lobby
      hubConnection
        .invoke("JoinRoom", newLobby, username)
        .catch((error) => {
          console.error("Error joining the lobby: " + error);
        });
      
      // Update the list of users in the lobby
      const updatedUsers = [...users, username];
      setUsers(updatedUsers);
    }
    // Update the active lobby and reset chat messages
    setLobby(newLobby);
    setReceivedMessages([]);

    // Close the lobby change menu
    setShowMenu(false);
  };

  // Handle username change and store it in session storage
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    sessionStorage.setItem("username", newUsername);
  };

  return (
    <div className="h-fit w-fit m-auto max-w-xs ">
      {lobby && (
        <div className="mb-2">
          <h1 className="p-3 bg-customOrange w-full text-lg font-medium text-white text-center rounded-t-xl">
            {lobby}
          </h1>
      {/* Online Users Section */}
<div className="p-2 text-white bg-customLightBrown rounded-b-xl">
  <div className="flex items-center mb-2">
    <span className="text-sm">Online Users:</span>
    <div className="flex flex-wrap gap-2 ml-2">
      {users.map((user, index) => (
        <span key={user} className="text-sm">
          {index === users.length - 1 ? `${user},` : `${user},`}
        </span>
      ))}
    </div>
  </div>
</div>
          {/* Chat Messages Section */}
          <div
            className="h-40 border border-customBrown p-2 overflow-y-auto bg-customBrown rounded"
            ref={chatContainerRef}
          >
            {receivedMessages.map((message, index) => (
              <div key={index} className="mb-2 text-white">
                <b>{message}</b>
              </div>
             ))}
          </div>
          <CustomInput
            textComponent="input"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="my-auto mb-2 text-white"
          />
          <CustomButton onClick={sendMessage} label="Send" />
        </div>
      )}
      {/* Menu */}
      {showMenu && (
        <div className="lobby-options py- rounded grid grid-flow-row gap-2 pb-2">
          <CustomButton
            onClick={() => changeLobby("Global Chat")}
            label={"Global chat"}
          />
          <CustomButton
            onClick={() => changeLobby("Zombies Chat")}
            label={"Zombies Chat"}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <CustomButton
            onClick={() => changeLobby("Humans Chat")}
            label={"Human Chat"}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          ></CustomButton>
          {isMember && (
            <CustomButton
              onClick={() => changeLobby("Squad Chat")}
              label={"Squad Chat"}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          )}
        </div>
      )}
      {/* Username Input and Chat Button */}
      <div className="flex flex-row space-x-1 pb-2 px-2 bg-customLightBrown rounded-lg justify-center">
        <CustomInput
          textComponent="input"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="my-auto mb-2 text-white"
        />
        <div className="justify-center pt-2 w-1/3">
          <CustomButton
            onClick={() => setShowMenu(!showMenu)}
            label={"Chat"}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};
export default ChatComponent;