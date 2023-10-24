import React, { useState } from 'react';

const InputField = ({ label, error, onChange, value, showIcon, iconPath, placeholder }) => {
    // Local state to manage input validation error
    const [localError, setLocalError] = useState('');
    
    // Function to handle input change
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue);
    };
    
    // Function to handle join click
    const handleJoinClick = () => {
        if (value.trim() === '') {
            setLocalError('Username is required.');
        } else {
            setLocalError('');
        }
    };

    return (<>
        {/* Label for the input field */}
        <div className={`flex focus-within:ring-2 focus-within:ring-customOrange bg-gray-200 border ${localError ? 'border-red-500' : 'border-gray-300'} rounded-md dark:bg-customLightOrange`}><label className="block  text-white text-sm text-start">{label}</label>

            {showIcon && (
                 // Display an icon if showIcon is true
                <span className="inline-flex items-center px-3 text-sm text-gray-900 dark:text-gray-400">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d={iconPath} />
                    </svg>
                </span>
            )}


            <input
                type="text"
                className={`rounded-none rounded-r-lg bg-white text-gray-900 focus:ring-0 block flex-1 min-w-0 w-full text-sm p-2.5 focus:outline-none ${localError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
            />
             {/* Display local error message if there's an error */}
            {localError && <p className="text-red-500 text-xs font-bold">{localError}</p>}
        </div></>
    );
};

export default InputField;
