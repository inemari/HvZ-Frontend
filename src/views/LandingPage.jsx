import React, { useState, useEffect } from 'react';
import Games from '../components/game/Games'; // Adjust the import path
import FilterSlider from '../components/game/GameTabs';
import { fetchGamesByState } from '../services/api'; // Adjust the import path
import GameContainer from '../components/common/Container';

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
      <FilterSlider activeTab={activeTab} handleTabChange={handleTabChange} />
      <GameContainer >
        <Games activeTab={activeTab} />
      </GameContainer>
    </>
  );
};

export default LandingPage;
