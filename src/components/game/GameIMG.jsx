import React from 'react';
import noImage from '../../assets/ui/noImage.png';

// GameIMG component displays an image of a game.
// Props:
// - game: An object containing game information, including the picture URL and title.
// - maxW: An optional maximum width for the image.
// - square: A boolean indicating whether the image should be displayed as a square.
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