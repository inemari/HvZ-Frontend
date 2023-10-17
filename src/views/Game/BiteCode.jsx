import React, { useEffect, useState } from 'react';
import ZombieFeatures from '../../components/biteCode/ZombieFeatures';
import { fetchPlayerInfo } from '../../services/api';

const BiteCode = ({ userRole }) => {
  const [biteCode, setBiteCode] = useState(null);

  useEffect(() => {
    // Fetch the player's bite code
    fetchPlayerInfo(1) // Set the player ID
      .then((response) => {
        console.log('API Response:', response);
        setBiteCode(response.biteCode);
      })
      .catch((error) => {
        console.error('Error fetching player info', error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-white">Bite Code Feature</h1>

      {userRole === 'human' && (
        <div>
          <h2 className="text-white">Your Bite Code:</h2>
          <p className="text-white">{biteCode}</p>
        </div>
      )}

      {/* Debugging */}
      {<ZombieFeatures playerId={1}/>}

      {/* {userRole === 'zombie' && (<ZombieFeatures playerId={1} debug={true} />)} */}
    </div>
  );
};

export default BiteCode; 
