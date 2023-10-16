import React, { useState, useEffect } from 'react';

import { getGamesByState } from '../../services/gameService';
import GameCard from './GameCard';
import { useNavigate } from 'react-router-dom';

const Games = ({ activeTab }) => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGamesData() {
            try {
                const gamesData = await getGamesByState(activeTab);
                setGames(gamesData);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
        fetchGamesData();
    }, [activeTab]);



    return (
        <div className=" grid grid-cols-1 lg:grid-cols-2  gap-2" >
            {
                games.map((game) => (
                    <GameCard game={game} key={game.id} />))
            }   </div >

    );
};

export default Games;
