import React from 'react';
import '../../styles/custom.css';
import GameCard from './GameCard';
import image1 from '../../assets/images/bg-landingpage.jpg';

const games = [
    {
        id: 1,
        imageSrc: image1,
        title: 'Supergame',
        description: 'Amet consequat deserunt culpa eiusmod ea exercitation labore mollit nonAmet consequat deserunt culpa eiusmod ea exercitation labore mollit non,Amet consequat deserunt culpa eiusmod ea exercitation labore mollit non.',
        state: 'Completed'
    },
    {
        id: 2,
        imageSrc: image1,
        title: 'Game 2',
        description: 'Amet consequat deserunt culpa eiusmod ea exercitation labore mollit non',
        state: 'In progress'
    },
    // Add more game objects as needed
];

const GameList = () => {
    return (
        <div className="container mx-auto  flex flex-row justify-center min-w-full box-border w-auto bg-black h-fit min-h-full bg-opacity-60 p-10 hover:overflow-scroll">
            <div className="">
                {games.map((game) => (
                    <GameCard
                        key={game.id}
                        imageSrc={game.imageSrc}
                        title={game.title}
                        description={game.description}
                        state={game.state}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameList;
