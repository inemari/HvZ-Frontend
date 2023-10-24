import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './Keycloak';

// Create a root for rendering the React application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Use ReactKeycloakProvider to wrap your application and provide authentication context
root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <App />
  </ReactKeycloakProvider>
);
