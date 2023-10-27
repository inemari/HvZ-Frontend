// ChooseGameModal.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GameCard from "../../game/GameCard";
import ModalContainer from "../../common/ModalContainer";
import { setEditGame } from "../../../services/adminService";
import gameService from "../../../api/services/gameService";

// ChooseGameModal component displays a modal with a list of games that can be selected for editing
// Props:
// - closeModal: A function to close the modal
const ChooseGameModal = ({ closeModal }) => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    
    // Fetch the list of games from the server and populate the state
    useEffect(() => {
        const fetchGamesData = async () => {
            try {
                // Use the gameService to fetch all games from the server.
                const gamesData = await gameService.getAll();
                 // Update the component's state with the fetched games data.
                setGames(gamesData);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGamesData();
    }, []);

    return (
        <ModalContainer showModal={true} handleCloseModal={closeModal} newBackground="bg-customLightBrown bg-opacity-40 ring-customLightBrown">
            <h2 className="text-1xl md:text-2xl font-bold mb-2 w-full p-2 text-center border-b ">Choose game to edit</h2>
            <div className='grid grid-cols-4 gap-2 h-fit ' >
                {games.map((game) => (
                    <GameCard game={game} onClick={() => setEditGame(game, navigate)} key={game.id} newBackground={"bg-opacity-90  bg-customLightBrown hover:bg-opacity-100 hover:shadow-neutral-700 shadow-sm"} />
                ))}
            </div>
        </ModalContainer>
    );
};

export default ChooseGameModal;
