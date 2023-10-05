import React from 'react';
import ButtonGroup from '../components/common/ButtonGroup';
import GameList from '../components/game/GameList';


const LandingPage = () => {
  return (
    <div className='flex flex-col m-6 min-h-full '>

      <div className="flex flex-col md:flex-row justify-between h-1/6 md:pb-6 pb-3 ">

        <h1 className="text-1xl md:text-5xl font-bold text-white font-passionOne flex flex-col md:pb-0 pb-3 ">Human vs Zombie</h1>
        {/**If user is not logged in */}
        <ButtonGroup />

      </div>
      {/* Add your additional information content here */}
      <GameList />
    </div>
  );
};

export default LandingPage;
