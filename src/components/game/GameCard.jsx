import React from 'react';
import '../../styles/custom.css';
import GameDetails from './GameDetails';
import { useNavigate } from 'react-router-dom';

// GameCard Component
const GameCard = ({ game }) => {  // Fixed prop passing
    const navigate = useNavigate();

    const handleGameClick = () => {
        // Save game information to localStorage when a game is clicked
        localStorage.setItem('selectedGame', JSON.stringify(game));

        // Navigate to the "/AboutGame" route
        navigate('/AboutGame');
    };
    return (
        <div className='bg-customLightBrown bg-opacity-70 shadow-md rounded-xl cursor-pointer w-full p-6 my-5' onClick={handleGameClick}>
            <GameDetails game={game} />
        </div>
    );
};
export default GameCard;
