import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
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
import KeycloakRoute from "./routes/KeyCloakRoute";
import * as signalR from '@microsoft/signalr';

const App = () => {
  const { keycloak, initialized } = useKeycloak();  // Use the hook to get keycloak instance
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [locationHubConnection, setLocationHubConnection] = useState(null);
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {
    if (initialized && keycloak.authenticated) {
      // Retrieve the token from Keycloak
      const token = keycloak.token;

      // Store the token in session storage
      sessionStorage.setItem('accessToken', token);

      // Use the token in your code as needed
      console.log(`User is authenticated, token: ${token}`);
      console.log(keycloak.hasRealmRole("user"));
      console.log(keycloak.hasRealmRole("admin"));
    }

  }, [initialized, keycloak.authenticated, keycloak.token]);

  useEffect(() => {
    const createLocationHubConnection = async () => {
      if (initialized && keycloak.authenticated) {
        const playerId = parseInt(sessionStorage.getItem('playerId'), 10);

        if(playerId !== null) {
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
        <NavBar />
        <ChatComponent hubConnection={hubConnection} />
        <div className="dark-bg absolute"></div>
        <div className="background-image absolute top-0 left-0 "></div>
          <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path='/AboutGame' element={<AboutGame />} />
                <Route path='/SquadRegistration' element={<SquadRegistration />} />
                <Route 
                  path="/SquadDetails"
                  element={
                  <KeycloakRoute role = "user">
                      <SquadDetails locationHubConnection={locationHubConnection} />
                  </KeycloakRoute>
                }
                />
                <Route
                  path="/Game"
                  element={
                  <KeycloakRoute role = "user">
                      <Game />
                  </KeycloakRoute>
                }/>
                <Route
                  path="/Map"
                  element={
                  <KeycloakRoute role = "user">
                      <MapPage />
                  </KeycloakRoute>
                }/>
                <Route
                  path="/BiteCode"
                  element={
                  <KeycloakRoute role = "user">
                      <BiteCode />
                  </KeycloakRoute>
                }/>
                <Route
                  path="/Admin"
                  element={
                  <KeycloakRoute role = "admin">
                      <AdminPage />
                  </KeycloakRoute>
                }/>
          </Routes>
        </div>
    </BrowserRouter>
    
  );
};

export default App;
