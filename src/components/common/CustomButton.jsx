// Button.jsx

import React from 'react';

const CustomButton = ({ label, onClick }) => {


  return (
    <button
      onClick={onClick}
      className={`flex box-border md:max-w-xs w-full justify-center font-bold h-fit py-2 rounded-full bg-customOrange hover:bg-opacity-90 text-customWhite  md:px-5 md:text-lg  lg:px-6 lg:text-xl`}
    >
      {label}
    </button>
  );
};

export default CustomButton;
