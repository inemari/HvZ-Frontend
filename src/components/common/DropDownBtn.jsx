import React, { useState } from 'react';
import CustomButton from './CustomButton';

const Dropdown = ({ label, options, onClickOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);

        // Call the onClickOption callback with the selected option
        if (onClickOption) {
            onClickOption(option);
        }
    };

    return (
        <div className="relative inline-block text-left">
            <div onClick={toggleDropdown}>
                <CustomButton label={label} className="w-full" />
            </div>
            {isOpen && (
                <div className="origin-top-right absolute mx-auto justify-center mt-2 w-full rounded-xl shadow-lg bg-white divide-y divide-gray-100">
                    <ul className='rounded-xl py-2'>
                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 text-sm hover:bg-customOrange hover:text-white cursor-pointer "
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {selectedOption && (
                <div className="absolute right-0 mt-2">
                    <p className="px-4 py-2 text-lg font-semibold bg-customOrange text-customWhite rounded-md">
                        {selectedOption}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
