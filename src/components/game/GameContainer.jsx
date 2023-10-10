import { useEffect, useState } from "react";

import GameList from "./GameList";



const GameContainer = ({ activeTab }) => {  // Receive activeTab prop
    const API_URL = process.env.REACT_APP_API_URL;
    const GamesEndpoint = `${API_URL}/Game`;
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch(GamesEndpoint)
            .then(response => response.json())
            .then(data => setGames(data))
            .catch(error => console.error('Error fetching games:', error));
    }, []);

    return (
        <div className="container mx-auto px-auto justify-center bg-black bg-opacity-60  rounded-lg mt-3">
            <GameList games={games} activeTab={activeTab} />
        </div>
    );
};
export default GameContainer;