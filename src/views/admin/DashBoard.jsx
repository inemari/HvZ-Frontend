// DashBoard.js
import React, { useState } from 'react';
import Container from '../../components/common/Container';
import NewGameBtn from '../../components/admin/newGameBtn';
import CustomButton from '../../components/common/CustomButton';
import editIcon from "../../assets/ui/edit.png";
import ChooseGameModal from '../../components/admin/editGame/ChooseGameModal';
import playerService, { changePlayerState } from "../../api/services/playerService";


function DashBoard() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [error, setError] = useState('');
    const [playerId, setPlayerId] = useState('');
    const [playerState, setPlayerState] = useState('');

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSubmit = async () => {
        try {

            if (!playerId) {
                setError('Player ID is required.');
                setConfirmationMessage('');
                return;
            }

            if (playerState === null || playerState === undefined) {
                setError('Player State is required.');
                setConfirmationMessage('');
                return;
            }

            const player = await playerService.getById(playerId);
            
            if (!player) {
                setError('Player not found. Please check the Player ID.');
                setConfirmationMessage('');
                return;
            } else {
                await changePlayerState(playerId, playerState);
                setConfirmationMessage(`State of player: ${playerId}, has been updated to ${playerState ? 'Zombie' : 'Human'}.`);
                setError(''); 
            }

        } catch (error) {
            console.log("Failed to update player state", error);
        }
    };

    return (
        <Container>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 w-full border-b pb-2 text-center">DashBoard</h1>
            <div className="mx-auto grid grid-cols-2 my-auto gap-5 h-fit">
                <div className='space-y-3 px-3 text-center'>
                    <h2 className="text-1xl md:text-2xl font-bold mb-2 w-full p-2">Manage games</h2>
                    <NewGameBtn />
                    <CustomButton
                        label={"Edit game"}
                        icon={editIcon}
                        iconPosition={"after"}
                        onClick={openModal}
                        rounded={"3xl"}
                    />
                </div>
                <div className='space-y-3 x-3 px-3 text-center '>
                    <h2 className="text-1xl md:text-2xl font-bold mb-2 w-full p-2">Manage players</h2>
                    <p>Edit player state</p>
                    <div>
                        <label htmlFor="playerId" className="block mb-2 text-sm mr-2 whitespace-nowrap font-medium text-white">Player ID</label>
                            <input
                            type="integer"
                            id="playerId"
                            placeholder="Enter Player ID"
                            value={playerId}
                            onChange={(e) => setPlayerId(e.target.value)}
                            className="border w-full col-span-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring--customOrange focus:border-customOrange block p-2.5 bg-customBrown dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-customOrange dark:focus:border-customOrange"
                            />
                        </div>
                        <div>
                            <label htmlFor="playerState" className="block mb-2 text-sm mr-2 whitespace-nowrap font-medium text-white">Game State</label>
                            <select
                            id="playerState"
                            value={playerState === true ? "true" : playerState === false ? "false" : ""}
                            onChange={(e) => setPlayerState(e.target.value === "true")}
                            className="border w-full col-span-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring--customOrange focus:border-customOrange block p-2.5 bg-customBrown dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-customOrange dark:focus:border-customOrange"
                            >
                                <option value="">Select a state</option> 
                                <option value="false">Human</option>
                                <option value="true">Zombie</option>
                            </select>
                        </div>
                    <CustomButton type="submit" label="Update Player State" onClick={handleSubmit} />  
                    {error && (
                        <p className="text-red-500">{error}</p>
                    )}
                    {confirmationMessage && (
                        <p className="text-green-500">{confirmationMessage}</p>
                    )}
                </div>
            </div>
            {isModalVisible && (
                <ChooseGameModal closeModal={closeModal} />
            )}
        </Container>
    );
}

export default DashBoard;
