import React from 'react';
import '../../styles/custom.css';
import GameDetails from './GameDetails';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ imageSrc, title, description, state }) => {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    return (
        <div className='bg-customLightOrange bg-opacity-20 shadow-md m-10 rounded-xl cursor-pointer' onClick={() => navigate('/AboutGame')} >
            <GameDetails imageSrc={imageSrc} title={title} description={description} state={state} />

        </div>

    );
};
export default GameCard;
