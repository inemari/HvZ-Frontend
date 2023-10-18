import React, { useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const ChatComponent = ({ hubConnection }) => {
  const [connection, setConnection] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [lobby, setLobby] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState([]);
  const [chatHeight, setChatHeight] = useState("40vh");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [username, setUsername] = useState(
    sessionStorage.getItem("username") || "Mr.Default"
  );

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("ReceiveMessage", (user, message) => {
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
    setLobby(newLobby);
    setReceivedMessages([]); // Clear received messages when changing the lobby
    setShowMenu(false);
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    sessionStorage.setItem("username", newUsername);
  };

  return (
    <div className="app relative">
      <div className="chat-component absolute top-4 right-4">
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
          className="border border-customBrown p-2 text-customBlack rounded"
        />
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="chat-button bg-customBrown text-customWhite px-4 py-2 rounded"
        >
          Chat
        </button>
        {showMenu && (
          <div className="lobby-options bg-customLightBrown p-2 rounded">
            <button
              onClick={() => changeLobby("Global Chat")}
              className="chat-button bg-customBrown text-customWhite px-4 py-2 rounded"
            >
              Join Global Chat
            </button>
            <button
              onClick={() => changeLobby("Zombies Chat")}
              className="chat-button bg-customBrown text-customWhite px-4 py-2 rounded"
            >
              Join Zombies Chat
            </button>
            <button
              onClick={() => changeLobby("Humans Chat")}
              className="chat-button bg-customBrown text-customWhite px-4 py-2 rounded"
            >
              Join Humans Chat
            </button>
          </div>
        )}
      </div>
      {lobby && (
        <div className="chat-box absolute top-16 right-4" style={{ height: chatHeight }}>
          <div className="w-72 p-4 border border-customBrown rounded bg-customLightBrown">
            <div className="mb-4 text-customBlack flex items-center justify-between text-2xl">
              <h1 className="gaming-font">{lobby}</h1>
              {isConnected && <div className="online-dot bg-green-500 w-3 h-3 rounded-full"></div>}
            </div>
            <div className="user-list">
              <p>Online Users:</p>
              <ul>
                {users.map((user) => (
                  <li key={user}>{user}</li>
                ))}
              </ul>
            </div>
            <div className="h-40 border border-customBrown p-2 text-customBlack overflow-y-auto mb-4 bg-gray-100 rounded">
              {receivedMessages.map((message, index) => (
                <div key={index} className="mb-2">
                  {message}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="border border-customBrown p-2 w-full mb-2 text-customBlack rounded"
            />
            <button
              onClick={sendMessage}
              className="bg-customOrange text-customWhite p-2 rounded w-full"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;