import React from 'react';

// PlayerStatus component displays information about a player, including their name, team (Zombie or Human), and status.
const PlayerStatus = ({ playerName, playerStatus, playerTeam }) => {

  // Determine the color based on the player's team (Zombie or Human)
  const statusColor = playerTeam === 'Zombie' ? 'text-red-500' : 'text-green-500';

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{playerName}</h2>
      <p className={`${statusColor} text-sm`}>{playerTeam}</p>
      <p className="text-gray-600">Status: {playerStatus}</p>
    </div>
  );
};
export default PlayerStatus;
