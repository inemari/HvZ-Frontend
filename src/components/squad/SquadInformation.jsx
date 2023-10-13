import React, { useEffect, useState } from 'react';
import { getSquadDetailsById } from '../../services/squadService';

const SquadInformation = ({ squadId }) => {
  const [squadDetails, setSquadDetails] = useState(null);

  useEffect(() => {
    // Fetch squad details with player information using squadId from localStorage
    async function fetchSquadDetails() {
      try {
        // Use the selectedSquadId from localStorage
        const details = await getSquadDetailsById(squadId);
        setSquadDetails(details);
      } catch (error) {
        console.error('Error fetching squad details:', error);
      }
    }

    fetchSquadDetails();
  }, [squadId]); // Fetch details whenever selectedSquadId changes

  return (
    <div className="flex justify-center items-center h-screen">
      {squadDetails ? (
        <div className="bg-black bg-opacity-60 text-white rounded-lg p-4">
          <h2>Squad Information</h2>
          <p>Squad Name: {squadDetails.squadName}</p>
          <p>Total Members: {squadDetails.numberOfMembers}</p>
          <p>Deceased Members: {squadDetails.numberOfDeceased}</p>
          <h3>Squad Members:</h3>
          <ul>
            {squadDetails.playerIds.map((member) => (
              <li key={member.username}>
                <p>Username: {member.username}</p>
                <p>State: {member.zombie ? 'Zombie' : 'Human'}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading squad information...</p>
      )}
    </div>
  );
};

export default SquadInformation;
