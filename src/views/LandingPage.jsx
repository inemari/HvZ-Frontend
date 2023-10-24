import clearSessionStorageData from '../helpers/SessionStorageUtils';
import React, { useState, useEffect } from 'react';
import Games from '../components/game/Games'; // Adjust the import path
import GameTabs from '../components/game/GameTabs';
import { fetchGamesByState } from '../services/api'; // Adjust the import path
import Container from '../components/common/Container';

// LandingPage component serves as the main page of the application, displaying games based on the selected tab (Registration, In Progress, or Completed).
const LandingPage = () => {
  clearSessionStorageData();
  const [activeTab, setActiveTab] = useState('Registration');
  const [games, setGames] = useState([]);
  
  // Use the `useEffect` hook to fetch games data when the active tab changes
  useEffect(() => {
    async function fetchGamesData() {
      try {
        const gamesData = await fetchGamesByState(activeTab);
        setGames(gamesData);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    }

    // Invoke the data-fetching function when the active tab changes
    fetchGamesData();
  }, [activeTab]); // Run effect whenever activeTab changes
  
  
  // Function to handle tab changes
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  
   // Render the LandingPage component
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