import React from 'react';

const GameIMG = ({ game }) => {

    return (
        <img className="rounded aspect-square m-auto" src={game.pictureURL} alt={game.title} />
    );
};

export default GameIMG;
