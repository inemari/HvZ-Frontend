import clearLocalStorageData from '../helpers/LocalStorageUtils';
import React, { useState, useEffect } from 'react';
import Games from '../components/game/Games'; // Adjust the import path
import GameTabs from '../components/game/GameTabs';
import { fetchGamesByState } from '../services/api'; // Adjust the import path
import Container from '../components/common/Container';

const LandingPage = () => {
  clearLocalStorageData();
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
      <GameTabs activeTab={activeTab} handleTabChange={handleTabChange} />
      <Container >

        <Games activeTab={activeTab} />
      </Container>
    </>
  );
};

export default LandingPage;
