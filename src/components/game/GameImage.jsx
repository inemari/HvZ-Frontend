import React from 'react';

const GameImage = ({ game }) => {

    return (
        <img className="rounded aspect-square m-auto" src={game.pictureURL} alt={game.title} />
    );
};

export default GameImage;
