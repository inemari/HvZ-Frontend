import React from 'react';

// FilterSlider component with activeTab and handleTabChange props
const FilterSlider = ({ activeTab, handleTabChange }) => {
  // Define an array of filter options with label and value
  const filterOptions = [
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Registration', value: 'Registration' },
    { label: 'Complete', value: 'Complete' },
  ];

  return (
    <div className="bg-custom-green rounded-lg border-4 border-customBrown flex items-center container mx-auto">
      {/* Map over each filter option and create buttons and separators */}
      {filterOptions.map((option, index) => (
        <React.Fragment key={option.value}>
          <button
            // Handle click event for changing the active tab
            onClick={() => handleTabChange(option.value)}
            className={`${
              // Apply background and text color based on activeTab state
              activeTab === option.value
                ? 'bg-customBrown text-white'
                : 'bg-custom-green text-customWhite'
              } py-2 px-4 rounded-md flex-1 text-center relative`}
          >
            {option.label}
          </button>
          {/* Add a separator (vertical line) after each option except the last one */}
          {index < filterOptions.length - 1 && (
            <div
              className="w-1 h-6 bg-customBrown absolute top-0 right-0 bottom-0 mt-3"
              style={{ marginLeft: '8px', marginRight: '8px' }}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FilterSlider; // Export the FilterSlider component
