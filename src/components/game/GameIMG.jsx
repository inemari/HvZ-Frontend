import React from 'react';
import noImage from '../../assets/ui/noImage.png';

const GameIMG = ({ game, maxW, square }) => {
    return (
        <img
            className={`rounded-xl object-cover min-w-xs ${maxW ? 'maxW' : 'max-w-lg flex '} ${square ? 'aspect-square h-auto' : ''}`}

            src={game.pictureURL}
            alt={game.title}
            onError={(e) => {
                e.target.src = noImage;
            }}
        />
    );
};

export default GameIMG;