import React from 'react';
import '../../styles/custom.css';
import CustomBtn from '../common/CustomButton';

import { useNavigate } from 'react-router-dom';

const GameDetails = ({ imageSrc, title, description, state }) => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleButtonClick = () => {
        // Navigate to the "/AboutGame" route when the button is clicked
        navigate('/AboutGame');
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex flex-row md:flex-col">
                <img className="mx-6 mt-6 rounded aspect-square sm:w-auto md:mb-6 md:h-36" src={imageSrc} alt={title} />
            </div>
            <div className="flex flex-col md:flex-col m-6 relative w-full">
                <div className="flex flex-row w-full justify-between">
                    <h5 className="text-xl font-medium text-white mb-2">
                        {title}
                    </h5>
                    <p className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 self-start">
                        {state}
                    </p>
                </div>
                <p className="text-base text-white">
                    {description}
                </p>
                <div className="absolute bottom-0 right-0 mt-auto">
                    <CustomBtn onClick={handleButtonClick} label={"Join"} className="w-fit" />
                </div>
            </div>
        </div>
    );
};

export default GameDetails;
