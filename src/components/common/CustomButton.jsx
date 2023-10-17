import React from 'react';

const CustomButton = ({ label, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center text-white hover:bg-opacity-75 focus:ring-2  focus:outline-none focus:ring-opacity-10 font-medium rounded-lg text-sm px-5 py-2.5 bg-customDarkOrange focus:ring-black"
    >{icon && <img src={icon} alt="icon" className="ml-2 h-7 w-7" />}
      <span>{label}</span>

    </button>
  );
};

export default CustomButton;