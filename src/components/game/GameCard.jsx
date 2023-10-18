import React from 'react';
import GameIMG from './GameIMG';

const GameCard = ({ game, onClick }) => {
    const { title, gameStateString, description } = game;

    return (
        <div
            className="grid md:grid-cols-4 grid-cols-1 bg-customLightBrown bg-opacity-70 shadow-md rounded-xl cursor-pointer w-full p-3 space-x-3"
            onClick={onClick}
        >
            <div className="md:col-span-1">
                <GameIMG game={game} />
            </div>

            <div className="md:col-span-3">
                <div className="flex flex-col md:flex-row w-full justify-between">
                    <h5 className="text-xl font-medium text-white">
                        {title}
                    </h5>
                    <p className="bg-customGreen text-xs md:text-sm font-medium px-2.5 py-1 rounded-full self-start">
                        {gameStateString}
                    </p>
                </div>
                <p className="text-base text-white">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default GameCard;
