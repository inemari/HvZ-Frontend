import React from 'react';
import '../../styles/custom.css';
import GameDetails from './GameDetails';

const GameCard = ({ imageSrc, title, description, state }) => {
    return (
        <div className='bg-customLightOrange bg-opacity-20 shadow-md m-10 rounded-xl'>
            <GameDetails imageSrc={imageSrc} title={title} description={description} state={state} />

        </div>

    );
};
export default GameCard;
