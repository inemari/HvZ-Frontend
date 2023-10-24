import React from 'react';
import CustomBtn from './CustomButton';
import { useKeycloak } from "@react-keycloak/web";

const AuthButtons = () => {
     // Get the keycloak instance using the useKeycloak hook
    const { keycloak } = useKeycloak();

    return (
        <>
            {!keycloak.authenticated && (
            // Render registration and login buttons if the user is not authenticated
                <>
                    <CustomBtn label="Register" />
                    <CustomBtn label="Login" onClick={() => keycloak.login()} />
                </>)}
            {keycloak.authenticated && (
            // Render a logout button if the user is authenticated
                <CustomBtn label="Logout" onClick={() => keycloak.logout()} />
            )}
        </>
    );
};

export default AuthButtons;