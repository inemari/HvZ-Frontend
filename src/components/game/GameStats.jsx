import React from 'react';

const GameStats = ({ stats }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Game Statistics</h2>
      <ul className="list-disc pl-4">
        <li>Total Players: {stats.totalPlayers}</li>
        <li>Humans: {stats.humans}</li>
        <li>Zombies: {stats.zombies}</li>
        <li>Missions Completed: {stats.missionsCompleted}</li>
        {/* Add more game statistics here */}
      </ul>
    </div>
  );
};

export default GameStats;
