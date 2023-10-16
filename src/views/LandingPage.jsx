import React, { useState, useEffect } from 'react';
import GameList from '../components/game/GameList'; // Adjust the import path
import FilterSlider from '../components/game/FilterSlider';
import { fetchGamesByState } from '../services/api'; // Adjust the import path
import GameContainer from '../components/game/GameContainer';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('Registration');
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGamesData() {
      try {
        const gamesData = await fetchGamesByState(activeTab);
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    }
    fetchGamesData();
  }, [activeTab]); // Run effect whenever activeTab changes

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      
      <GameContainer>
        <FilterSlider activeTab={activeTab} handleTabChange={handleTabChange} />
        <GameList games={games} activeTab={activeTab} />
      </GameContainer>
    </>
  );
};

export default LandingPage;
