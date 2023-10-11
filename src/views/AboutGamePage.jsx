import React from 'react';
import NavBar from '../components/common/NavBar';
import CustomBtn from '../components/common/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

function AboutGame() {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const handleButtonClick = () => {
        navigate('/Game');
    };

    // Retrieve the game information from localStorage
    const selectedGame = JSON.parse(localStorage.getItem('selectedGame'));

    return (
        <div className='flex flex-col m-6 min-h-full justify-center py-auto'>


            {/* Game Box */}
            <div className="container mx-auto p-6 bg-black bg-opacity-60  rounded-lg text-white">


                <h1 className="text-3xl md:text-4xl font-bold  mb-3 ">{selectedGame.title}</h1>

                <div className='flex flex-row'>
                    <div className='w-1/2 p-10'>
                        {/* <img src="selectedGame.pictureURL" alt="xx" className='flex flex-col' /> */}

                        <img src="https://images.pexels.com/photos/2953863/pexels-photo-2953863.jpeg" alt="xx" className=' aspect-square' />
                    </div>

                    {/* Display game information from localStorage */}
                    {selectedGame && (
                        <div className=' bg-customLightBrown w-1/2 aspect-square rounded p-10'>
                            <h2 className="text-lg md:text-xl font-bold">Description</h2>
                            <p className="text-base mb-3">{selectedGame.description}</p>
                            <h2 className="text-lg md:text-xl font-bold">State:</h2>
                            <h2 className="text-lg md:text-xl font-bold">{selectedGame.gameStatus}</h2>

                            {/* Add more fields as needed */}
                            {keycloak.authenticated && (
                                <div className=" mb-0">
                                    <CustomBtn onClick={handleButtonClick} label={"Join"} className="w-fit" />
                                </div>
                            )}
                        </div>
                    )}
                </div></div>

        </div>
    );
}

export default AboutGame;
