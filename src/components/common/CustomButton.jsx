import React from 'react';

// CustomButton component represents a customizable button with optional icon support.
// Props:
// - label: The text label for the button.
// - onClick: A callback function to be executed when the button is clicked.
// - icon: An optional icon image to display alongside the label.
// - iconPosition: The position of the icon (before or after the label).
// - rounded: An optional value to control the button's rounded corners (e.g., "sm", "lg").
// - type: The button type (e.g., "button" or "submit").
// - id: An optional ID for the button element.
const CustomButton = ({ label, onClick, icon, iconPosition, rounded, type, id }) => {
  const baseClasses = "flex items-center justify-center shadow-sm shadow-gray-800 w-full  text-white justify-center hover:bg-customDarkOrange focus:ring-2 focus:outline-none focus:ring-opacity-10 font-medium rounded-lg px-6 py-2 bg-customOrange focus:ring-black";
  const roundedClasses = rounded ? `rounded-${rounded}` : '';

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${roundedClasses}`}
    >
      {iconPosition === 'before' && icon && (
        <img src={icon} alt="icon" className="h-15 w-8 py-2 pr-2" />
      )}
      <span>{label}</span>
      {iconPosition === 'after' && icon && (
        <img src={icon} alt="icon" className=" h-15 w-8 py-2 pl-2 " />
      )}
    </button>
  );
};

export default CustomButton;
