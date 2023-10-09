import React from 'react';
import '../../styles/custom.css';
import GameDetails from './GameDetails';
import { useNavigate } from 'react-router-dom';

// GameCard Component
const GameCard = ({ game }) => {  // Fixed prop passing
    const navigate = useNavigate();
    return (
        <div className='bg-customLightOrange bg-opacity-20 shadow-md m-10 rounded-xl cursor-pointer' onClick={() => navigate('/AboutGame')} >
            <GameDetails game={game} />
        </div>
    );
};
export default GameCard;
