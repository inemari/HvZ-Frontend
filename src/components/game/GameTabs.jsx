// FilterSlider.jsx

import React, { useEffect, useState } from "react";
import { getGameStatusValues } from "../../api/services/gameService.js";

const GameTabs = ({ activeTab, handleTabChange }) => {
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    async function fetchGameStatusValues() {
      try {
        const gameStatusValues = await getGameStatusValues();
        setFilterOptions(gameStatusValues);
      } catch (error) {
        console.error(
          "There has been a problem with fetching game status values:",
          error
        );
      }
    }
    fetchGameStatusValues();
  }, []);

  return (
    <div className="w-full bg-black bg-opacity-60 flex rounded-md ">
      {filterOptions.map((option) => (
        <React.Fragment key={option.gameState}>
          <button
            onClick={() => handleTabChange(option.gameState)}
            className={`${
              activeTab === option.gameState
                ? "bg-customDarkOrange text-white rounded-md"
                : " text-customWhite hover:bg-customDarkOrange hover:bg-opacity-40 "
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
