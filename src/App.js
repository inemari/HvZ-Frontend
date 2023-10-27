import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/custom.css";
import LandingPage from "./views/LandingPage";
import AboutGame from "./views/AboutGamePage";
import MapPage from "./views/Game/MapPage";
import SquadRegistration from "./views/Game/Squad/SquadRegistration.jsx";
import SquadDetails from "./views/Game/Squad/SquadDetails";
import BiteCode from "./views/Game/BiteCode";
// import AuthenticatedRoute from './helpers/AuthenticatedRoute';
import { useKeycloak } from "@react-keycloak/web"; // Import useKeycloak
import NavBar from "./components/common/NavBar";
import ChatComponent from "./components/chat/Chat";

import * as signalR from "@microsoft/signalr";
import { LocationProvider } from "./LocationContext";
import CreateGame from "./views/admin/CreateGame";
import EditGame from "./views/admin/EditGame";
import KeycloakRoute from "./routes/KeyCloakRoute";
import Dashboard from "./views/admin/Dashboard";

const App = () => {
  const { keycloak, initialized } = useKeycloak(); // Use the hook to get keycloak instance
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [locationHubConnection, setLocationHubConnection] = useState(null);
  const [hubConnection, setHubConnection] = useState(null);
  const [triggerBool, setTriggerBool] = useState(false);
  // const location = useLocation().pathname;
  // const disallowedPaths = ['/', '/LandingPage', '/AboutGame', '/EditGame', '/CreateGame', '/Dashboard'];
  useEffect(() => {
    const createLocationHubConnection = async () => {
      if (initialized && keycloak.authenticated) {
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:7041/locationhub")
          .configureLogging(signalR.LogLevel.Debug)
          .build();

        try {
          await newConnection.start();
          console.log("Connected to SignalR locationhub!");
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
  }, [initialized, keycloak.authenticated]); // Listen for changes in authentication status

  useEffect(() => {
    const createHubConnection = async () => {
      if (initialized && keycloak.authenticated) {
        // Only create SignalR connection if authenticated
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl("https://localhost:7041/chathub", {
            /*                 skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets  */
          })

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
  }, [initialized, keycloak.authenticated]); // Listen for changes in authentication status

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
