import React, { useState } from 'react';

const ZombieFeatures = () => {
  const [biteCode, setBiteCode] = useState('');

  const handleBiteCodeSubmit = () => {
    // Handle the submission of the bite code here
    console.log('Handling the submission of the bite code:', biteCode);

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
