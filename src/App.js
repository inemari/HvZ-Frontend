import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/custom.css";
import LandingPage from "./views/LandingPage";
import AboutGame from "./views/AboutGamePage";
import MapPage from "./views/Game/MapPage";
import SquadRegistration from "./views/Game/Squad/SquadRegistration.jsx";
import SquadDetails from "./views/Game/Squad/SquadDetails";
import BiteCode from "./views/Game/BiteCode";
import { useKeycloak } from "@react-keycloak/web";
import NavBar from "./components/common//navigation/NavBar";
import ChatComponent from "./components/chat/Chat";
import * as signalR from "@microsoft/signalr";
import { LocationProvider } from "./LocationContext";
import CreateGame from "./views/admin/CreateGame";
import EditGame from "./views/admin/EditGame";
import KeycloakRoute from "./routes/KeyCloakRoute";
import Dashboard from "./views/admin/DashBoard";

/**
 * The `App` component is the root component of the application.
 * It sets up the routing for different views, handles authentication using Keycloak, and initializes SignalR connections
 * for real-time communication features like chat and location updates.
 */
const App = () => {
  const { keycloak, initialized } = useKeycloak(); // Use the hook to get keycloak instance
  const [locationHubConnection, setLocationHubConnection] = useState(null);
  const [hubConnection, setHubConnection] = useState(null);

  useEffect(() => {

    // Function to create a new SignalR hub connection for location updates
    const createLocationHubConnection = async () => {
      if (initialized && keycloak.authenticated) {
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl(process.env.REACT_APP_LOCATIONHUB_URL)
          .configureLogging(signalR.LogLevel.Debug)
          .build();
        try {
          await newConnection.start();
          setLocationHubConnection(newConnection);
          newConnection.on("ReceiveLocationUpdate", (playerId, x, y) => {
            console.log(
              `Received location update from ${playerId}: x - ${x}, y - ${y}`
            );
          });
        } catch (error) {
          console.error("Error connecting to SignalR locationhub: ", error);
        }
      }
    };
    createLocationHubConnection();
  }, [initialized, keycloak.authenticated]);

  useEffect(() => {
    // Function to create a new SignalR hub connection for chat messages
    const createHubConnection = async () => {
      if (initialized && keycloak.authenticated) {
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl(process.env.REACT_APP_CHATHUB_URL)
          .configureLogging(signalR.LogLevel.Debug)
          .build();

        newConnection.on("ReceiveMessage", (user, message) => {
          console.log(`Received message from ${user}: ${message}`);
        });

        try {
          await newConnection.start();
          console.log("Connected to SignalR chathub!");
          setHubConnection(newConnection);
        } catch (error) {
          console.error("Error connecting to SignalR chathub: ", error);
        }
      }
    };
    createHubConnection();
  }, [initialized, keycloak.authenticated]);

  return (
    <BrowserRouter>
      <LocationProvider>
        <div className="relative">
          <div className="dark-bg absolute"></div>
          <div className="background-image absolute top-0 left-0 "></div>
          <NavBar />
        </div>
        <div className="m-5 space-y-5 break-words static">
          <Routes>
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/AboutGame" element={<AboutGame />} />
            <Route
              path="/MapPage"
              element={
                <KeycloakRoute role="user" requiresGameJoin={true}>
                  <MapPage locationHubConnection={locationHubConnection} />
                  <div className="m-5 space-y-5 break-words absolute bottom-0 right-0 z-50">
                    <ChatComponent hubConnection={hubConnection} />
                  </div>
                </KeycloakRoute>
              }
            />
            <Route
              path="/SquadRegistration"
              element={
                <KeycloakRoute role="user" requiresGameJoin={true}>
                  <SquadRegistration />
                  <div className="m-5 space-y-5 break-words absolute bottom-0 right-0 z-50">
                    <ChatComponent hubConnection={hubConnection} />
                  </div>
                </KeycloakRoute>
              }
            />
            <Route
              path="/SquadDetails"
              element={
                <KeycloakRoute role="user" requiresGameJoin={true}>
                  <SquadDetails locationHubConnection={locationHubConnection} />
                  <div className="m-5 space-y-5 break-words absolute bottom-0 right-0 z-50">
                    <ChatComponent hubConnection={hubConnection} />
                  </div>
                </KeycloakRoute>
              }
            />
            <Route
              path="/BiteCode"
              element={
                <KeycloakRoute role="user" requiresGameJoin={true}>
                  <BiteCode />
                  <div className="m-5 space-y-5 break-words absolute bottom-0 right-0 z-50">
                    <ChatComponent hubConnection={hubConnection} />
                  </div>
                </KeycloakRoute>
              }
            />
            <Route
              path="/DashBoard"
              element={
                <KeycloakRoute role="admin">
                  <Dashboard />
                </KeycloakRoute>
              }
            />
            <Route
              path="/CreateGame"
              element={
                <KeycloakRoute role="admin">
                  <CreateGame />
                </KeycloakRoute>
              }
            />
            <Route
              path="/EditGame"
              element={
                <KeycloakRoute role="admin">
                  <EditGame />
                </KeycloakRoute>
              }
            />
          </Routes>
        </div>
      </LocationProvider>
    </BrowserRouter>
  );
};

export default App;
