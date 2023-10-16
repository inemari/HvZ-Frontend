import React, { useEffect, useState } from 'react';
import { fetchPlayerInfo } from './api';

const HumanFeatures = () => {
  const [biteCode, setBiteCode] = useState(null);

  useEffect(() => {
    const playerId = 1; // Replace with the appropriate player ID

    // Fetch the player's information, including the bite code
    fetchPlayerInfo(playerId)
      .then((player) => {
        // Set the fetched bite code to state
        setBiteCode(player.biteCode);
      })
      .catch((error) => {
        console.error('Error fetching player info', error);
      });
  }, []); // Run once when the component mounts

  return (
    <div>
      <h2>Your Bite Code:</h2>
      <p>{biteCode}</p>
    </div>
  );
};

export default HumanFeatures; 
