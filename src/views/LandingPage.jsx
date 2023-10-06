import React, { useState } from 'react';

import GameList from '../components/game/GameList';
import FilterSlider from '../components/game/FilterSlider'; // Import the FilterSlider component
import NavBar from '../components/common/NavBar';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('In Progress'); // Initially, set the "In Progress" tab as active.

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='flex flex-col m-6 min-h-full '>

      <NavBar />

      {/* Game Options Box */}
      <div className="m-10 justify-center mt-3">
        <FilterSlider activeTab={activeTab} handleTabChange={handleTabChange} />
      </div>

      {/* Pass activeTab to GameList */}
      <GameList activeTab={activeTab} />
    </div>

  );
};

export default LandingPage;
