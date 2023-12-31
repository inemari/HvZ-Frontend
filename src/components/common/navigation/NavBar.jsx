import logo from '../../../assets/icons/logo2.png';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AuthButtons from './AuthButtons.jsx.jsx';
import Dropdown from './DropDownBtn.jsx';
import { NavLink } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';


// NavBar navigation bar adapting its content based on user roles and the current page with responsive design.
const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const disallowedPaths = ['/', '/LandingPage', '/AboutGame', '/EditGame', '/CreateGame', '/Dashboard'];
    const { keycloak } = useKeycloak();

    // Function to toggle the hamburger menu displayed on small screens.
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="bg-black bg-opacity-70 sticky inset-0 z-10 block w-full max-w-full mb-5 shadow-lg">
            <div className="flex flex-wrap md:flex-row md:flex-nowrap items-center mx-10">
                <div className='flex'>
                    <img src={logo} className="max-h-24 md:max-h-24 py-5 cursor-pointer" alt="App Logo" onClick={() => navigate('/')} />
                </div>
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-gray-700 focus:outline-none rounded p-3 mr-0 ml-auto"
                >
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="white"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 9h18M3 15h18"
                            />
                        )}
                    </svg>
                </button>

                <div className={`text-white md:flex md:mr-0 md:ml-auto w-full md:w-auto pb-3 `}>
                    <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 justify-center rounded md:bg-transparent md:p-0 ">

                        <li>
                            <NavLink
                                to={"/LandingPage"}
                                className={`aria-[current=page]:font-bold aria-[current=page]:hover:font-bold hover:font-semibold`}
                            >
                                LandingPage
                            </NavLink>
                        </li>
                        {!disallowedPaths.includes(location.pathname) && (
                            <>
                                <li>
                                    <NavLink
                                        to={'/MapPage'}
                                        className={`aria-[current=page]:font-bold aria-[current=page]:hover:font-bold hover:font-semibold`}
                                    >
                                        Map
                                    </NavLink>
                                </li>
                                <li>
                                    <Dropdown
                                        className={''}
                                        label="Manage Squad"
                                        options={['Squad registration', 'Squad details']}
                                        onClickOption={(option) => {
                                            if (option === 'Squad registration') {
                                                navigate('/SquadRegistration');
                                            } else if (option === 'Squad details') {
                                                navigate('/SquadDetails');
                                                toggleMenu();
                                            }
                                        }}
                                    />
                                </li>
                                <li>
                                    <NavLink
                                        to={"/BiteCode"}
                                        className={`aria-[current=page]:font-bold aria-[current=page]:hover:font-bold hover:font-semibold`}
                                    >
                                        Bite code actions
                                    </NavLink>
                                </li>

                            </>
                        )}


                        {keycloak.authenticated && keycloak.hasRealmRole("admin") && (
                            <li>
                                <NavLink
                                    to={"/Dashboard"}
                                    className={`aria-[current=page]:font-bold aria-[current=page]:hover:font-bold hover:font-semibold`}
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        )}</ul>
                    <div className="space-y-2 md:space-y-0 md:space-x-6 space-x-2 md:flex-row md:flex pl-4 ">
                        <AuthButtons type="button" />
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default NavBar;
