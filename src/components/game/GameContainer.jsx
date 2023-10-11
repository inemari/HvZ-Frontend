import { useEffect, useState } from "react";

import GameList from "./GameList";
import { getGames, getGamesByState } from "../../services/gameService";
import { fetchGamesByState } from "../../services/api";



const GameContainer = ({ activeTab }) => {  // Receive activeTab prop


    const [games, setGames] = useState([]);
    useEffect(() => {
        async function fetchGamesData() {
            try {
                // Use the getGames function from gameService.js
                const gamesData = await fetchGamesByState(activeTab);
                setGames(gamesData);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        }
        fetchGamesData();
    }, []);
    console.log();
    return (
        <div className="container mx-auto px-auto justify-center bg-black bg-opacity-60  rounded-lg mt-3">
            <GameList games={games} activeTab={activeTab} />
        </div>
    );
};
export default GameContainer;