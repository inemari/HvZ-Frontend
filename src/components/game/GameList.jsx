import React, { useState, useEffect } from 'react';
import GameCard from './GameCard';

const GameList = ({ activeTab }) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [games, setGames] = useState([]);

    const gameStateMap = {
        'In Progress': 'InProgress',  // Adjust these values to match your backend enum strings
        'Registration': 'Registration',
        'Complete': 'Complete',
    };

    const getGameStateValue = (tab) => gameStateMap[tab] || tab;

    useEffect(() => {
        async function fetchGames() {
            try {
                const gameStateValue = getGameStateValue(activeTab);
                const response = await fetch(`${API_URL}/game/filterbystates/${gameStateValue}`);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        }
        fetchGames();
    }, [activeTab, API_URL]);

    return (
        <div className='container mx-auto'>
            {games.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    );
};

export default GameList;
