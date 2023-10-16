// GameList.jsx

import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';
import { getGamesByState } from '../../services/gameService';

const GameList = ({ activeTab }) => {
    const [games, setGames] = useState([]);

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
        <div className='p-5' style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
            {games.map(game => (
                <GameCard game={game} key={game.id} />
            ))}
        </div>
    );
};

export default GameList;
