import React, { useState } from 'react';
import NavBar from '../components/common/NavBar';
import CustomBtn from '../components/common/CustomButton';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';
import GameImage from '../components/game/GameImage';
import UserNameModal from '../components/game/UserNameModal'; // Import the UserNameModal component
import ModalContainer from '../components/common/ModalContainer';
import GameContainer from '../components/game/GameContainer';

function AboutGame() {
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();

    const [showModal, setShowModal] = useState(false); // State to manage modal visibility

    const handleButtonClick = () => {
        setShowModal(true); // Show the modal when the "Join" button is clicked
    };

    const handleCloseModal = () => {
        setShowModal(false); // Close the modal
    };

    // Retrieve the game information from localStorage
    const selectedGame = JSON.parse(localStorage.getItem('selectedGame'));

    return (
        <GameContainer >
            {/* Game Box */}
            <div className="container mx-auto p-6 bg-black bg-opacity-60  rounded-lg text-white">
                <h1 className="text-3xl md:text-4xl font-bold  mb-3 ">{selectedGame.title}</h1>
                <div className='flex flex-row'>
                    <div className='w-1/2 p-10'>
                        <GameImage game={selectedGame} />
                    </div>
                    {/* Display game information from localStorage */}
                    {selectedGame && (
                        <div className=' bg-customLightBrown w-1/2 aspect-square rounded p-10'>
                            <h2 className="text-lg md:text-xl font-bold">Description</h2>
                            <p className="text-base mb-3">{selectedGame.description}</p>
                            <h2 className="text-lg md:text-xl font-bold">State:</h2>
                            <p className="text-base mb-3">{selectedGame.gameStateString}</p>
                            {/* Add more fields as needed */}
                            {keycloak.authenticated && (
                                <div className=" mb-0">
                                    <CustomBtn onClick={handleButtonClick} label={"Join Game"} className="w-fit" />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Render the modal conditionally */}
            {showModal && (
                <ModalContainer showModal={showModal} closeModal={handleCloseModal}>
                    <UserNameModal onClose={handleCloseModal} />
                </ModalContainer>
            )}
        </GameContainer>
    );
}

export default AboutGame;
