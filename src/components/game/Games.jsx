import React from 'react';
import useGames from '../../services/useGames';
import GameCard from './GameCard';
import NewGameBtn from '../admin/newGameBtn';

const Games = ({ activeTab }) => {
    // Retrieve a list of games based on the activeTab
    const { games, handleGameClick } = useGames(activeTab);

    return (<>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 my-auto max-h-36 gap-5 h-full">
            {/* Map through the list of games and render GameCard components for each */}
            {games.map((game) => (
                <GameCard game={game} key={game.id} onClick={() => handleGameClick(game)} />
            ))}
        </div>

         {/* Render NewGameBtn component at the bottom right (Only for admin) */}
        <div className="m-5 space-y-5 break-words absolute bottom-0 right-0 "> <NewGameBtn /></div>

    </>
    );
};

export default Games;
