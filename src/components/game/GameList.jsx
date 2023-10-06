import React from 'react';
import '../../styles/custom.css'; // Import custom CSS styles
import GameCard from './GameCard'; // Import the GameCard component
import image1 from '../../assets/images/bg-landingpage.jpg'; // Import image assets

// Array of game objects with details
const games = [
    {
        id: 1,
        imageSrc: image1,
        title: 'Supergame',
        description:
            'Amet consequat deserunt culpa eiusmod ea exercitation labore mollit nonAmet consequat deserunt culpa eiusmod ea exercitation labore mollit non,Amet consequat deserunt culpa eiusmod ea exercitation labore mollit non.',
        state: 'Completed',
    },
    {
        id: 2,
        imageSrc: image1,
        title: 'Game 2',
        description: 'Amet consequat deserunt culpa eiusmod ea exercitation labore mollit non',
        state: 'In Progress',
    },
    // Add more game objects as needed
];

// GameList component that takes an 'activeTab' prop
const GameList = ({ activeTab }) => {
    let filteredGames;

    // Check if 'activeTab' is 'Complete' to filter games with 'Completed' state
    if (activeTab === 'Complete') {
        filteredGames = games.filter((game) => game.state === 'Completed');
    } else {
        // Filter games based on 'activeTab' state
        filteredGames = games.filter((game) => game.state === activeTab);
    }

    return (
        <div className="container mx-auto  flex flex-row justify-center min-w-full box-border w-auto bg-black h-fit min-h-full bg-opacity-60 p-10 hover:overflow-scroll">
            <div className="">
                {filteredGames.map((game) => (
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

export default GameList; // Export the GameList component
