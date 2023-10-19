import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/custom.css";
import LandingPage from "./views/LandingPage";
import AboutGame from "./views/AboutGamePage";
import Game from "./views/Game/Game";
import MapPage from "./views/Game/MapPage";
import SquadRegistration from "./views/Game/Squad/SquadRegistration.jsx";
import SquadDetails from "./views/Game/Squad/SquadDetails";
import BiteCode from "./views/Game/BiteCode";
// import AuthenticatedRoute from './helpers/AuthenticatedRoute';
import { useKeycloak } from "@react-keycloak/web"; // Import useKeycloak
import NavBar from "./components/common/NavBar";
import ChatComponent from "./components/chat/Chat";
import * as signalR from "@microsoft/signalr";
import AdminPage from "./views/AdminPage";

const App = () => {
  const { keycloak, initialized } = useKeycloak(); // Use the hook to get Keycloak instance
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {
    const createHubConnection = async () => {
      if (initialized && keycloak.authenticated) {
        // Only create SignalR connection if authenticated
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:7041/chathub", {
            /*     skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets */
          })

          .configureLogging(signalR.LogLevel.Debug)
          .build();

        newConnection.on("ReceiveMessage", (user, message) => {
          console.log(`Received message from ${user}: ${message}`);
        });

        try {
          await newConnection.start();
          console.log("Connected to SignalR hub!");
          setHubConnection(newConnection);
        } catch (error) {
          console.error("Error connecting to SignalR hub: ", error);
        }
      }
    };

    createHubConnection();
  }, [initialized, keycloak.authenticated]); // Listen for changes in authentication status

  return (
    <BrowserRouter>
      <div className="relative p-10">
        <div className="dark-bg absolute"></div>
        <div className="background-image absolute top-0 left-0 "></div>
        <NavBar />
        <ChatComponent hubConnection={hubConnection} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/AboutGame" element={<AboutGame />} />
          <Route path="/Game" element={<Game />} />
          <Route path="/Map" element={<MapPage />} />
          <Route path="/SquadRegistration" element={<SquadRegistration />} />
          <Route path="/SquadDetails" element={<SquadDetails />} />
          <Route path="/BiteCode" element={<BiteCode />} />
          <Route path="/Admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
