//biteCodeService.js
import React, { useEffect, useState } from 'react';
import ZombieFeatures from '../components/biteCode/ZombieFeatures';
import { fetchPlayerInfo } from './api'; 


const BiteCode = ({ userRole }) => {
  const [biteCode, setBiteCode] = useState(null);

  useEffect(() => {
    const playerId = 1; // Set the player ID you want to fetch

    // Fetch the player's bite code
    fetchPlayerInfo(playerId)
      .then((response) => {
        setBiteCode(response.biteCode);
      })
      .catch((error) => {
        console.error('Error fetching player info', error);
      });
  }, []);

  return (
    <div>
      <h1>Bite Code Feature</h1>

      {userRole === 'human' && (
        <div>
          <h2>Your Bite Code:</h2>
          <p>{biteCode}</p>
        </div>
      )}

      {userRole === 'zombie' && <ZombieFeatures />}
    </div>
  );
};

export default BiteCode; 
