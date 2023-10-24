import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Dropdown = ({ label, options, onClickOption }) => {
    // State to manage the open/closed state of the dropdown
    const [isOpen, setIsOpen] = useState(false);
    // State to store the selected option
    const [selectedOption, setSelectedOption] = useState(null);
    
    // Function to toggle the dropdown's open/closed state
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
     // Function to handle option click
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        toggleDropdown ();
        // Call the onClickOption callback with the selected option
        if (onClickOption) {
            onClickOption(option);
        }
    };

    return (
        <div className="relative inline-block text-left text-white ">
            <div onClick={toggleDropdown}>
                {/* Button to open/close the dropdown */}
                <button className=" flex justify-between items-center ">
                    {label}
                    <span className="inline-flex items-center ">
                        <svg
                            className={`ml-2 w-3 h-3 transition-transform transform ${isOpen ? 'rotate-180' : 'rotate-0'
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1 4 4 7 1"
                            />
                        </svg>
                    </span>
                </button>
            </div>
            {isOpen && (
                // Dropdown content displayed when isOpen is true
                <div className="origin-top-right absolute mt-2 w-full rounded-xl shadow-lg bg-customLightBrown divide-y divide-gray-100">
                    <ul className="rounded-xl py-2">
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 text-sm cursor-pointer hover:bg-white hover:bg-opacity-10 "
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
       
        </div >
    );
};

export default Dropdown;
