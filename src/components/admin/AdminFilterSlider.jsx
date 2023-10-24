import React from 'react';

const AdminFilterSlider = ({ activeTab, handleTabChange }) => {
  // Available filter options
  const filterOptions = ['Create Game', 'Edit Game'];

  return (
    // Container for the filter slider, with a custom background and rounded style
    <div className="container mx-auto bg-customLightBrown flex rounded-md">
      {filterOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleTabChange(option)} // Click handler to change the active tab
          className={`${activeTab === option
            ? 'bg-customBrown text-white rounded-md ' // Styling for the active tab
            : ' text-customWhite hover-bg-customBrown hover:bg-opacity-80 hover:rounded-md '
            } py-2 px-4 flex-1 text-center relative`}
        >
          {option} {/* Display the filter option label on the button */}
        </button>
      ))}
    </div>
  );
};

export default AdminFilterSlider;