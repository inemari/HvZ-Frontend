import React from 'react';
import CustomBtn from './CustomButton';
import { useKeycloak } from "@react-keycloak/web";

const AuthButtons = () => {
    const { keycloak } = useKeycloak();

    return (
        <>
            {!keycloak.authenticated && (
                <>
                    <CustomBtn label="Register" />
                    <CustomBtn label="Login" onClick={() => keycloak.login()} />
                </>)}
            {keycloak.authenticated && (
                <CustomBtn label="Logout" onClick={() => keycloak.logout()} />
            )}
        </>
    );
};

export default AuthButtons;