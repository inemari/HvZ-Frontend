import logo from '../../assets/icons/LogoHVZ.png'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import AuthButtons from './AuthButtons.jsx'; // Import the AuthButtons component
import Dropdown from './DropDownBtn.jsx'; // Import the Dropdown component

const NavBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const renderGameButtons = () => {
        return (
            <ul className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 justify-center">
                {location.pathname === '/Game' &&
                    <>
                        <li>
                            <Dropdown
                                className="block  pl-3 pr-4 text-white rounded md:bg-transparent md:p-0"
                                label="Manage Squad"
                                options={['Squad registration', 'Squad details']}
                                onClickOption={(option) => {
                                    if (option === 'Squad registration') {
                                        navigate('/SquadRegistration');
                                    } else if (option === 'Squad details') {
                                        navigate('/SquadDetails');
                                    }
                                }}
                            />
                        </li>
                        <li>
                            <a
                                href="/Map"
                                className="block  pl-3 pr-4 text-white rounded md:bg-transparent md:p-0"
                                aria-current="page"
                            >
                                Map
                            </a>
                        </li>
                        <li>
                            <a
                                href="/BiteCode"
                                className="block  pl-3 pr-4 text-white rounded md:bg-transparent md:p-0"
                                aria-current="page"
                            >
                                Bite code actions
                            </a>
                        </li></>}
                <div className=" space-y-2 md:space-y-0 md:space-x-6 space-x-2 md:flex-row md:flex">
                    <AuthButtons type="button" />
                </div>
            </ul>
        );
    };

    return (
        <nav className="bg-customLightBrown sticky inset-0 z-10 block w-full max-w-full mb-5">
            <div className=" flex flex-wrap md:flex-row md:flex-nowrap items-center mx-10">
                <div className='flex '>
                    <img src={logo} className=" max-h-24 md:max-h-24 py-5" alt="App Logo" />
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


                <div className={`md:flex md:mr-0 md:ml-auto w-full md:w-auto pb-3 ${menuOpen ? 'block' : 'hidden'}`}>
                    {renderGameButtons()}
                </div>

            </div >
        </nav >
    );
};

export default NavBar;
