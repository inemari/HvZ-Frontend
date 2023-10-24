import React, { useEffect, useState } from 'react';
import { getGameStatusValues } from '../../services/gameService';

// GameTabs component displays game filter tabs based on game statuses
const GameTabs = ({ activeTab, handleTabChange }) => {
  // State to store filter options
  const [filterOptions, setFilterOptions] = useState([]);
  
   // Fetch game status values from the server and set them in the state
  useEffect(() => {
    async function fetchGameStatusValues() {
      try {
        const gameStatusValues = await getGameStatusValues();
        setFilterOptions(gameStatusValues);
      } catch (error) {
        console.error('There has been a problem with fetching game status values:', error);
      }
    }
    fetchGameStatusValues();
  }, []);

  return (
    <div className="w-full bg-black bg-opacity-60 flex rounded-md ">
      {filterOptions.map((option) => (
        <React.Fragment key={option.gameState}>
          {/* Render a button for each game status option */}
          <button
            onClick={() => handleTabChange(option.gameState)}
            className={`${activeTab === option.gameState
              ? 'bg-customDarkOrange text-white rounded-md'
              : ' text-customWhite hover:bg-customDarkOrange hover:bg-opacity-40 '
              } py-2 space-x-4 flex-1 text-center relative`}
          >
            {/*Render the game state string as the button text*/}
            {option.gameStateString}
          </button>
        </React.Fragment>
      ))}

    </div>
  );
};

export default GameTabs;