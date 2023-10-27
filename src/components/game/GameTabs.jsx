import React, { useEffect, useState } from "react";
import { getGameStatusValues } from "../../api/services/gameService.js";

// GameTabs component provides a set of tabs for filtering games by their status.
// Props:
// - activeTab: The currently active tab (game state).
// - handleTabChange: A callback function to handle tab changes.
const GameTabs = ({ activeTab, handleTabChange }) => {
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {

    // Asynchronously fetch game status values and populate the filter options.
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

    // Trigger the data fetching when the component mounts.
    fetchGameStatusValues();
  }, []);

  return (
    <div className="w-full bg-customBrown bg-opacity-95 flex rounded-md shadow-sm shadow-neutral-800">
      {filterOptions.map((option) => (
        <React.Fragment key={option.gameState}>
          <button
            onClick={() => handleTabChange(option.gameState)}
            className={`${activeTab === option.gameState
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
