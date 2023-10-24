import React from 'react';

const CustomButton = ({ label, onClick, icon, iconPosition, rounded }) => {
  // Define base classes for the button
  const baseClasses = "flex items-center justify-center shadow-sm shadow-gray-800 w-full  text-white justify-center hover:bg-customDarkOrange focus:ring-2 focus:outline-none focus:ring-opacity-10 font-medium rounded-lg px-6 py-2 bg-customOrange focus:ring-black";
  // Add rounded classes based on the 'rounded' prop
  const roundedClasses = rounded ? `rounded-${rounded}` : '';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${roundedClasses}`}
    >
      {iconPosition === 'before' && icon && (
        // Display the icon before the label, if 'iconPosition' is 'before' and an 'icon' is provided
        <img src={icon} alt="icon" className="h-15 w-8 py-2 pr-2" />
      )}
      <span>{label}</span>
      {iconPosition === 'after' && icon && (
        // Display the icon after the label, if 'iconPosition' is 'after' and an 'icon' is provided
        <img src={icon} alt="icon" className=" h-15 w-8 py-2 pl-2 " />
      )}
    </button>
  );
};

export default CustomButton;
