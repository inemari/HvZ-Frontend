// FilterSlider.jsx

import React, { useEffect, useState } from 'react';
import { getGameStatusValues } from '../../services/gameService';

const FilterSlider = ({ activeTab, handleTabChange }) => {
  const [filterOptions, setFilterOptions] = useState([]);

  useEffect(() => {
    async function fetchGameStatusValues() {
      try {
        // Use the service function to fetch game status values
        const gameStatusValues = await getGameStatusValues();
        setFilterOptions(gameStatusValues);
      } catch (error) {
        console.error('There has been a problem with fetching game status values:', error);
      }
    }
    fetchGameStatusValues();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div className="container mx-auto bg-customLightBrown flex rounded-md">
      {filterOptions.map((option) => (
        <React.Fragment key={option}>
          <button
            onClick={() => handleTabChange(option)}
            className={`${activeTab === option
              ? 'bg-customBrown text-white rounded-md '
              : ' text-customWhite hover:bg-customBrown hover:bg-opacity-80 hover:rounded-md '
              } py-2 px-4 flex-1 text-center relative`}
          >
            {option}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default FilterSlider;