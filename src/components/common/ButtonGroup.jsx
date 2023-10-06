import React from 'react';
import CustomBtn from './CustomButton';
import keycloak from '../../Keycloak';

const ButtonGroup = () => {

    return (
        <div className="flex flex-row space-x-6 w-full justify-between md:justify-end md:max-w-xs">
            {!keycloak.authenticated && (
                <>
                    <CustomBtn label="Register" />
                    <CustomBtn label="Login" onClick={() => keycloak.login()} />
                </>)}
            {keycloak.authenticated && (
                <CustomBtn label="Logout" onClick={() => keycloak.logout()} />
            )}

        </div>
    );
};

export default ButtonGroup;
