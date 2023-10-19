import React from 'react';
import useGames from '../../services/useGames';
import GameCard from './GameCard';

const Games = ({ activeTab }) => {
    const { games, handleGameClick } = useGames(activeTab);

    return (
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 my-auto max-h-36 gap-5 h-full">
            {games.map((game) => (
                <GameCard game={game} key={game.id} onClick={() => handleGameClick(game)} />
            ))}
        </div>
    );
};

export default Games;
