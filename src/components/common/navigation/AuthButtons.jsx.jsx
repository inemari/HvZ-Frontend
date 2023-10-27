import React from 'react';
import CustomBtn from '../CustomButton';
import { useKeycloak } from "@react-keycloak/web";

// AuthButtons component displays different authentication buttons based on the user's authentication status.
const AuthButtons = () => {
    const { keycloak } = useKeycloak();// Initialize Keycloak authentication.
    return (
        <>
            {/* Render login-button when the user is not authenticated and 'Logout' when the user is authenticated.  */}
            {!keycloak.authenticated && (
                <CustomBtn label="Login" onClick={() => keycloak.login()} />
            )}
            {keycloak.authenticated && (
                <CustomBtn label="Logout" onClick={() => keycloak.logout()} />
            )}
        </>
    );
};

export default AuthButtons;