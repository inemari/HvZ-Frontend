import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

//Component used to protect routes based on user authentication and role requirements.
function KeycloakRoute({ children, role, redirectTo = '/', requiresGameJoin = false }) {
  const { keycloak, initialized } = useKeycloak();

  if (requiresGameJoin) {
    const joinedGame = sessionStorage.getItem('joinedGame');

    // Redirect to landing page when the game joining is required and not satisfied
    if (!joinedGame) {
      return <Navigate replace to={redirectTo} />;
    }
  }
  //Return null Keycloak is not initialized
  if (!initialized) {
    return null;
  }

  if (keycloak.authenticated && keycloak.hasRealmRole(role)) {
    return <>{children}</>;
  }
  return <Navigate replace to={redirectTo} />;
}

export default KeycloakRoute;