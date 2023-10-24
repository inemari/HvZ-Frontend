import React from 'react';

// GameStats component displays game statistics, including total players, humans, zombies, and missions completed.
const GameStats = ({ stats }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Game Statistics</h2>
      <ul className="list-disc pl-4">
        <li>Total Players: {stats.totalPlayers}</li>
        <li>Humans: {stats.humans}</li>
        <li>Zombies: {stats.zombies}</li>
        <li>Missions Completed: {stats.missionsCompleted}</li>
      </ul>
    </div>
  );
};

export default GameStats;
