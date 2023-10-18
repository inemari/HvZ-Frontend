// useGames.js
import { useState, useEffect } from 'react';
import { getGamesByState } from './gameService'; // Adjusted import path

import { useNavigate } from 'react-router-dom';

const useGames = (activeTab) => {
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

  const handleGameClick = (game) => {
    // Save game information to localStorage when a game is clicked
    localStorage.setItem('selectedGame', JSON.stringify(game));

    // Navigate to the "/AboutGame" route
    navigate('/AboutGame');
  };

  return { games, handleGameClick };
};

export default useGames;
