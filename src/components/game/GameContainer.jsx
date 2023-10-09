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
        <div className="container mx-auto px-auto flex flex-row justify-center box-border bg-black h-fit min-h-full bg-opacity-60 hover:overflow-scroll rounded-lg">
            <GameList games={games} activeTab={activeTab} />
        </div>
    );
};
export default GameContainer;