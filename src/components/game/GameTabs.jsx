// FilterSlider.jsx

import React, { useEffect, useState } from 'react';
import { getGameStatusValues } from '../../services/gameService';

const GameTabs = ({ activeTab, handleTabChange }) => {
  const [filterOptions, setFilterOptions] = useState([]);

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
    <div className="w-full bg-customLightBrown flex rounded-md ">
      {filterOptions.map((option) => (
        <React.Fragment key={option.gameState}>
          <button
            onClick={() => handleTabChange(option.gameState)}
            className={`${activeTab === option.gameState
              ? 'bg-customBrown text-white rounded-t-md'
              : ' text-customWhite hover:bg-customBrown hover:bg-opacity-80 hover:rounded-md '
              } py-2 space-x-4 flex-1 text-center relative`}
          >
            {option.gameStateString}
          </button>
        </React.Fragment>
      ))}

    </div>
  );
};

export default GameTabs;