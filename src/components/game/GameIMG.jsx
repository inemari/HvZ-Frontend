import React from 'react';
import noImage from '../../assets/ui/noImage.png';

const GameIMG = ({ game }) => {
    return (
        <img
            className="rounded-xl h-full w-full object-cover"
            src={game.pictureURL}
            alt={game.title}
            onError={(e) => {
                e.target.src = noImage;
            }}
        />
    );
};

export default GameIMG;