import React, { useEffect, useState } from 'react';
import { getSquadDetailsById, joinSquad, leaveSquad } from '../../services/squadService';

const SquadInformation = ({ squadId }) => {
  const [squadDetails, setSquadDetails] = useState(null);
  const [isMember, setIsMember] = useState(false); // A flag to track squad membership

  const playerId = localStorage.getItem('playerId');

// Define fetchSquadDetails here
const fetchSquadDetails = async () => {
    try {
      const details = await getSquadDetailsById(squadId);
      setSquadDetails(details);
      console.log('Player IDs in Squad:', details.playerIds);
      // Check if the player is a member of the squad (you might need to adjust this based on your data)
      console.log('Details: ', details);
      //setIsMember(details.playerIds.includes(playerId));
      const playerId = parseInt(localStorage.getItem('playerId'), 10);
      console.log('Player ID in localStorage:', playerId);

      setIsMember(details.playerIds.some((player) => player.playerId === playerId));

      console.log("true/false",playerId) 
    } catch (error) {
      console.error('Error fetching squad details:', error);
    }
  };

  useEffect(() => {
    // Fetch squad details when the component mounts
    fetchSquadDetails();
  }, [squadId]);

  console.log('Current Player ID:', playerId);
  

  // Function to join or leave the squad
  const handleJoinOrLeaveSquad = async () => {
    try {
      if (isMember) {
        // Leave the squad
        await leaveSquad(squadId, playerId);
      } else {
        // Join the squad
        await joinSquad(squadId, playerId);
      }

      // Refetch squad details to update the information
      await fetchSquadDetails();
    } catch (error) {
      console.error('Error joining or leaving the squad:', error);
    }
  };

  console.log('Is Member:', isMember);

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
          <button onClick={handleJoinOrLeaveSquad}>
            {isMember ? 'Leave Squad' : 'Join Squad'}
          </button>
        </div>
      ) : (
        <p>Loading squad information...</p>
      )}
    </div>
  );
};

export default SquadInformation;
