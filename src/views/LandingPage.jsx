import React, { useState } from 'react';
import ButtonGroup from '../components/common/ButtonGroup';
import GameList from '../components/game/GameList';
import FilterSlider from '../components/game/FilterSlider'; // Import the FilterSlider component

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('In Progress'); // Initially, set the "In Progress" tab as active.

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className='flex flex-col m-6 min-h-full '>

      <div className="flex flex-col md:flex-row justify-between h-1/6 md:pb-6 pb-3 ">

        <h1 className="text-1xl md:text-5xl font-bold text-white font-passionOne flex flex-col md:pb-0 pb-3 ">Human vs Zombie</h1>
        {/**If user is not logged in */}
        <ButtonGroup />
      </div>

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
