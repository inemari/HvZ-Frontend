import React from 'react';
import CustomBtn from './CustomButton';
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from 'react-router-dom';

const AuthButtons = () => {
    const { keycloak } = useKeycloak();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the access token from session storage
        sessionStorage.removeItem('accessToken');
        
        navigate('/');
        // Perform the Keycloak logout
        keycloak.logout();
    };

    return (
        <>
            {!keycloak.authenticated && (
                <>
                    <CustomBtn label="Register" />
                    <CustomBtn label="Login" onClick={() => keycloak.login()} />
                </>)}
            {keycloak.authenticated && (
                <CustomBtn label="Logout" onClick={handleLogout} />
            )}
        </>
    );
};

export default AuthButtons;