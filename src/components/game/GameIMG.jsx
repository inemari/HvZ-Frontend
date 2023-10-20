import React from 'react';
import noImage from '../../assets/ui/noImage.png';

const GameIMG = ({ game }) => {
    return (
        <img
            className="rounded aspect-square m-auto"
            src={game.pictureURL}
            alt={game.title}
            onError={(e) => {
                e.target.src = noImage;
            }}
        />
    );
};

export default GameIMG;