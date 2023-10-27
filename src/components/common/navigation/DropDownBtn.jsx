import React, { useState } from 'react';

// Dropdown component displays a dropdown menu with a label and a list of options.
// Props:
// - label: The label displayed on the dropdown button.
// - options: An array of options to display in the dropdown.
// - onClickOption: A callback function called when an option is clicked.

const Dropdown = ({ label, options, onClickOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the dropdown's open/closed state.
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Function to  update the selected option, close the dropdown, and invoke the provided onClickOption callback if available.
    const handleOptionClick = (option) => {
       
        toggleDropdown();

        if (onClickOption) {
            onClickOption(option);
        }
    };

    return (
        <div className="relative inline-block text-left text-white ">
            <div onClick={toggleDropdown}>
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
