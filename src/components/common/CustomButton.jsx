// Button.jsx

import React from 'react';

const CustomButton = ({ label, onClick }) => {


  return (
    <button
      onClick={onClick}
      className={'mt-4 w-full text-white bg-customOrange hover:bg-customDarkOrange focus:ring-2 focus:outline-none focus:ring-black focus:ring-opacity-10 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-customOrange dark:hover:bg-customDarkOrange dark:focus:ring-black dark:focus:ring-opacity-10'}
    >
      {label}
    </button>
  );
};

export default CustomButton;
