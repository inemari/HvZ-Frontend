// useGames.js
import { useState, useEffect } from 'react';
import { getGamesByState } from "../api/services/gameService.js";
import { useNavigate } from 'react-router-dom';

const useGames = (activeTab) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

   // Use the useEffect hook to fetch games when the activeTab changes.
  useEffect(() => {
    async function fetchGamesData() {
      try {
        const gamesData = await getGamesByState(activeTab); // Fetch games based on the activeTab parameter.
        setGames(gamesData);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
    fetchGamesData(); // Call the function to initiate the data fetching when activeTab changes.
  }, [activeTab]);

    // Function to handle the click event on a game and navigate to the game details page.
  const handleGameClick = (game) => {
    // Save game information to localStorage when a game is clicked
    localStorage.setItem('selectedGame', JSON.stringify(game));

    // Navigate to the "/AboutGame" route
    navigate('/AboutGame');
  };

    // Return an object with games and the handleGameClick function for external use.
  return { games, handleGameClick };
};

export default useGames;
