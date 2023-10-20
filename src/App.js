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
import { useKeycloak } from '@react-keycloak/web';  // Import useKeycloak
import NavBar from './components/common/NavBar';
import ChatComponent from "./components/chat/Chat";
import AdminPage from './views/AdminPage';
import * as signalR from '@microsoft/signalr';

const App = () => {
  const { keycloak, initialized } = useKeycloak();  // Use the hook to get keycloak instance
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [locationHubConnection, setLocationHubConnection] = useState(null);
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {
    const createLocationHubConnection = async () => {
      if (initialized && keycloak.authenticated) {
        const playerId = parseInt(sessionStorage.getItem('playerId'), 10);

        if (playerId !== null) {
          const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7041/locationhub')
            .configureLogging(signalR.LogLevel.Debug)
            .build();

          try {
            await newConnection.start();
            console.log("Connected to SignalR hub!");

            newConnection.on("ReceiveLocationUpdate", (playerId, x, y) => {
              console.log(`Received location from ${playerId}: x - ${x}, y - ${y}`);
            });

            await newConnection.invoke("OnConnectedAsync", playerId);
            setLocationHubConnection(newConnection);
          } catch (error) {
            console.error("Error connecting to SignalR hub: ", error);
          }
        }
      }
    };

    createLocationHubConnection();
  }, [initialized, keycloak.authenticated]); // Listen for changes in authentication status

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

        <div className='m-10 space-y-5 break-words'>
          <Routes >
            <Route path='/LandingPage' element={<LandingPage />} />
            <Route path='/AboutGame' element={<AboutGame />} />
            <Route path='/Map' element={<MapPage />} />
            <Route path='/SquadRegistration' element={<SquadRegistration />} />
            <Route path='/SquadDetails' element={<SquadDetails locationHubConnection={locationHubConnection} />} />
            <Route path='/BiteCode' element={<BiteCode />} />
            <Route path='/Admin' element={<AdminPage />} />
          </Routes>
          <ChatComponent hubConnection={hubConnection} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
