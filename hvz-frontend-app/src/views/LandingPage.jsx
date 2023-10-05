// LandingPage.jsx

import React from 'react';
import Button from '../components/common/Button';
// import GameList from '../components/game/GameList';

const LandingPage = () => {
  return (
    <div className="relative bg-gray-400 min-h-screen">
      <style>
        {`
          body {
            background-color: #f0f0f0;
          }
        `}
      </style>
      <div className="absolute top-4 left-4">
        <h1 className="text-4xl font-passionOne text-customWhite">Human vs Zombie</h1>
      </div>
      <div className="absolute top-4 right-4">
        <div className="flex space-x-2 md:space-x-4 lg:space-x-6"> {/* Responsive spacing */}
          <Button label="Login" />
          <Button label="Register" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
