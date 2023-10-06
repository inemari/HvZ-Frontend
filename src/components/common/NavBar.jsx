import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup';
import logo from '../../assets/icons/LogoHVZ.png'

const NavBar = () => {
    return (
        <div className="flex flex-col md:flex-row md:pb-6 pb-3 mx-auto justify-between items-center">
            <div className="flex items-center"> {/* Align items horizontally */}
                <img src={logo} alt="App Logo" className="md:pb-0 pb-3 md:max-h-28 justify-end" />
            </div>
            {/**If user is not logged in */}
            <div className=''> {/* Push to the right */}
                <ButtonGroup className="ml-auto"/>
            </div>
        </div>

    )
};
export default NavBar;