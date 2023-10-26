// ChooseGameModal.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import GameCard from "../../game/GameCard";
import ModalContainer from "../../common/ModalContainer";
import { fetchGames } from "../../../services/api";
import { setEditGame } from "../../../services/adminService";

const ChooseGameModal = ({ closeModal }) => {
    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGamesData = async () => {
            try {
                const gamesData = await fetchGames();
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
