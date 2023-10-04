// Button.jsx

import React from 'react';

const Button = ({ label, onClick }) => {
  // Determine the background color based on the button type
  const backgroundColorClass = 'bg-customOrange hover:bg-customDarkOrange';

  // Determine the text color based on the button type
  const textColorClass = 'text-customWhite';

  return (
    <button
      onClick={onClick}
      className={`font-bold py-2 px-4 rounded-full ${backgroundColorClass} ${textColorClass} md:py-3 md:px-5 md:text-lg lg:py-4 lg:px-6 lg:text-xl`}
    >
      {label}
    </button>
  );
};

export default Button;
