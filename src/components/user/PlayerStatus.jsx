import React from 'react';

const PlayerStatus = ({ playerName, playerStatus, playerTeam }) => {
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
