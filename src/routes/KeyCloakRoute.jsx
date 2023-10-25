import { Navigate } from "react-router-dom";
import keycloak from "../Keycloak";

function KeycloakRoute({ children, role, redirectTo = "/" }) {
  
  if (!keycloak.authenticated) {
    return <Navigate replace to={redirectTo} />;
  }

  if (keycloak.hasRealmRole(role)) {
    return <>{children}</>;
  }

  return <Navigate replace to={redirectTo} />;
}

export default KeycloakRoute;