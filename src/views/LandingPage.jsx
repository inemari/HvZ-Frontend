import React, { useState } from 'react';

import GameContainer from '../components/game/GameContainer';
import FilterSlider from '../components/game/FilterSlider'; // Import the FilterSlider component
import NavBar from '../components/common/NavBar';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('In Progress');

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='flex flex-col m-6 min-h-full '>
      <NavBar />
      <div className="pb-6 justify-center mt-3">
        <FilterSlider activeTab={activeTab} handleTabChange={handleTabChange} />
      </div>
      <GameContainer activeTab={activeTab} />
    </div>
  );
};
export default LandingPage;