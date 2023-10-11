import React from 'react';

const GameControls = ({ onMissionComplete, onTeamChat }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Game Controls</h2>
      <button
        onClick={onMissionComplete}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 mr-2 hover:bg-blue-600"
      >
        Complete Mission
      </button>
      <button
        onClick={onTeamChat}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-600"
      >
        Team Chat
      </button>
      {/* Add more game controls as needed */}
    </div>
  );
};

export default GameControls;
