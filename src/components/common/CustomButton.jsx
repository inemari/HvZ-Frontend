// Button.jsx

import React from 'react';

const CustomButton = ({ label, onClick }) => {


  return (
    <button
      onClick={onClick}
      className={' text-white  hover:bg-opacity-60 focus:ring-2 focus:outline-none  focus:ring-opacity-10 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-customDarkOrange focus:ring-black'}
    >
      {label}
    </button>
  );
};

export default CustomButton;
