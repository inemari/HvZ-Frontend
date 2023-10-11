// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useKeycloak } from '@react-keycloak/web';

// const AuthenticatedRoute = ({ children, role, redirectTo = "/" }) => {
//   const { keycloak, initialized } = useKeycloak();

//   if (!initialized) {
//     return null;  // or a loading indicator
//   }

//   if (!keycloak.authenticated) {
//     return <Navigate replace to={redirectTo} />;
//   }

//   if (role && !keycloak.hasRealmRole(role)) {
//     return <Navigate replace to={redirectTo} />;
//   }

//   return <>{children}</>;
// };

// export default AuthenticatedRoute;
