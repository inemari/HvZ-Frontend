import React from 'react';

const AdminFilterSlider = ({ activeTab, handleTabChange }) => {
  const filterOptions = ['Create Game', 'Edit Game'];

  return (
    <div className="container mx-auto bg-customLightBrown flex rounded-md">
      {filterOptions.map((option) => (
        <button
          key={option}
          onClick={() => handleTabChange(option)}
          className={`${activeTab === option
            ? 'bg-customBrown text-white rounded-md '
            : ' text-customWhite hover-bg-customBrown hover:bg-opacity-80 hover:rounded-md '
            } py-2 px-4 flex-1 text-center relative`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AdminFilterSlider;