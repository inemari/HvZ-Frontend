import React, { useState } from 'react';
import { createNewSquad } from '../../services/squadService';

const SquadCreate = () => {
  const [squadName, setSquadName] = useState('');
  const [createdSquad, setCreatedSquad] = useState(null); // State to store the created squad data

  const handleSquadCreate = async () => {
    try {
      // Call the createNewSquad function to create a new squad
      const newSquad = await createNewSquad(squadName);
      setCreatedSquad(newSquad);
      
      // Reset the form field after successful creation
      setSquadName('');
    } catch (error) {
      console.error('Error creating squad:', error);
    }
  };

  return (
    <div className="bg-black bg-opacity-60 text-white rounded-lg p-4">
      <h2 className="text-2xl font-bold">Create Squad</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium">Squad Name:</label>
          <input
            type="text"
            value={squadName}
            onChange={(e) => setSquadName(e.target.value)}
            className="text-black bg-white rounded p-2"
          />
        </div>
        <button
          type="button"
          onClick={handleSquadCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300"
        >
          Create Squad
        </button>
      </form>
      {createdSquad && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Created Squad:</h3>
          <p>Squad Name: {createdSquad.squadName}</p>
        </div>
      )}
    </div>
  );
};

export default SquadCreate;
