import React, { useState } from 'react';
import { turnHumanIntoZombie } from '../../services/api';

const ZombieFeatures = ({ playerId, onBiteCodeSubmit }) => {
  const [biteCode, setBiteCode] = useState('');


  // NOTE: Look threw it.
  const handleBiteCodeSubmit = () => {
    // Create an object to update the player's status
    const updatedData = {
      zombie: true,
    };

    // Send a request to the server to turn a human into a zombie
    turnHumanIntoZombie(playerId, updatedData) // Use the defined API function
      .then((response) => {
        // Handle the response from the server if needed
        console.log('Player modification response:', response);
        if (response.success) {
          alert('Player turned into a zombie successfully!');
          onBiteCodeSubmit(); // Call the parent component's function to refresh data
        } else {
          alert('Invalid bite code. Player not turned into a zombie.');
        }
      })
      .catch((error) => {
        console.error('Error turning a player into a zombie', error);
        alert('An error occurred. Player not turned into a zombie.');
      });

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
