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
    <div className='flex flex-col fixed justify-center mx-auto w-full'>
      
      <FilterSlider activeTab={activeTab} handleTabChange={handleTabChange} />
      <GameContainer activeTab={activeTab} />
    </div>
  );
};
export default LandingPage;