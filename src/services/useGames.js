import { useState, useEffect } from 'react';
import { getGamesByState } from './gameService'; 
import { useNavigate } from 'react-router-dom';

// Custom hook to fetch and manage games based on the active tab
const useGames = (activeTab) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  
  // Use the useEffect hook to fetch games when the activeTab changes
  useEffect(() => {
    async function fetchGamesData() {
      try {
        // Fetch games based on the provided activeTab (game state)
        const gamesData = await getGamesByState(activeTab);
        setGames(gamesData);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
    fetchGamesData(); // Call the fetchGamesData function when the component mounts and when the activeTab changes
  }, [activeTab]); // Dependency array ensures the effect runs when activeTab changes
  
    // Handle game click and navigate to the "/AboutGame" route
  const handleGameClick = (game) => {
    // Save game information to localStorage when a game is clicked
    localStorage.setItem('selectedGame', JSON.stringify(game));

    // Navigate to the "/AboutGame" route
    navigate('/AboutGame');
  };
  
   // Return the games data and the handleGameClick function for use in components
  return { games, handleGameClick };
};

export default useGames;
