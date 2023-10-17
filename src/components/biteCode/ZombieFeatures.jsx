import React, { useState } from 'react';
import { changeZombieStateOfPlayer, turnHumanIntoZombie } from '../../services/api';

const ZombieFeatures = ({ playerId, onBiteCodeSubmit }) => {
  const [biteCode, setBiteCode] = useState('');

  // Handle the submission of the bite code
  const handleBiteCodeSubmit = () => {
    // Create an object to update the player's status
const updatedData = {
  zombie: false,
  biteCode: biteCode, // Add biteCode to the request
};

changeZombieStateOfPlayer(playerId, updatedData)

// Clear the biteCode field
setBiteCode('');

  };

  return (
    <div className="text-white">
      <h2 className="text-2xl mb-2">Enter Bite Code to Turn Human into a Zombie:</h2>
      <input
        className="rounded-md p-2 w-64 bg-gray-800 text-white"
        type="text"
        placeholder="Enter Bite Code"
        value={biteCode}
        onChange={(e) => setBiteCode(e.target.value)}
      />
      <button
        className="bg-red-500 text-white p-2 rounded-md mt-2"
        onClick={handleBiteCodeSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default ZombieFeatures;
