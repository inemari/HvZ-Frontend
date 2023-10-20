import React from 'react';

const CustomButton = ({ label, onClick, icon, iconPosition, rounded }) => {
  const baseClasses = "flex items-center justify-center text-white justify-center hover:bg-customDarkOrange focus:ring-2 focus:outline-none focus:ring-opacity-10 font-medium rounded-lg text-sm px-6 py-2 bg-customOrange focus:ring-black";
  const roundedClasses = rounded ? `rounded-${rounded}` : '';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${roundedClasses}`}
    >
      {iconPosition === 'before' && icon && (
        <img src={icon} alt="icon" className="h-15 w-8 py-2 pr-2" />
      )}
      <span>{label}</span>
      {iconPosition === 'after' && icon && (
        <img src={icon} alt="icon" className=" h-15 w-8 py-2 pl-2" />
      )}
    </button>
  );
};

export default CustomButton;
