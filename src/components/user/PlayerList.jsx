import React from 'react';

// PlayerList component displays a list of players with their avatars, names, and statuses
const PlayerList = ({ players }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold">Players</h2>
      <ul className="list-disc pl-4">
        {players.map((player) => (
          <li key={player.id} className="flex items-center space-x-2">
            <img
              src={player.avatar}
              alt={`${player.name}'s avatar`}
              className="w-8 h-8 rounded-full"
            />
            <p>{player.name}</p>
            <span
              className={`${
                player.isZombie ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {player.isZombie ? 'Zombie' : 'Human'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
