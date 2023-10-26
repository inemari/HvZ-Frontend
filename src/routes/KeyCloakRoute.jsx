import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

function KeycloakRoute({ children, role, redirectTo = '/', requiresGameJoin = false }) {
  const { keycloak, initialized } = useKeycloak();

  if (requiresGameJoin) {
    const joinedGame = sessionStorage.getItem('joinedGame');

    if (!joinedGame) {
      // Redirect to landing page when the game joining is required and not satisfied
      return <Navigate replace to={redirectTo} />;
    }
  }

  if (!initialized) {
    // Keycloak is still initializing, return null
    return null;
  }

  if (keycloak.authenticated && keycloak.hasRealmRole(role)) {
    return <>{children}</>;
  }

  return <Navigate replace to={redirectTo} />;
}

export default KeycloakRoute;