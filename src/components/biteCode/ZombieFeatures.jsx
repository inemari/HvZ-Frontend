import React, { useState } from 'react';
import { modifyPlayer } from '../../services/api';


const ZombieFeatures = ({ playerId }) => {
  const [biteCode, setBiteCode] = useState('');

  const handleBiteCodeSubmit = () => {
    // Handle the submission of the bite code here
    console.log('Handling the submission of the bite code:', biteCode);

    // You can call your API function here to turn a human into a zombie
    modifyPlayer(playerId, { biteCode })
      .then((response) => {
        // Handle the response from the server if needed
        console.log('Player modification response:', response);
      })
      .catch((error) => {
        console.error('Error modifying player', error);
      });

    // Clear the biteCode field
    setBiteCode('');
  };

  return (
    <div>
      <h2>Enter Bite Code to Turn Human into a Zombie:</h2>
      <input
        type="text"
        placeholder="Enter Bite Code"
        value={biteCode}
        onChange={(e) => setBiteCode(e.target.value)}
      />
      <button onClick={handleBiteCodeSubmit}>Submit</button>
    </div>
  );
};

export default ZombieFeatures;
