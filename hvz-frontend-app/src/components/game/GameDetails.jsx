import React from 'react';
import '../../styles/custom.css';

const GameDetails = ({ imageSrc, title, description, state }) => {
    return (
        <div className="flex flex-col md:flex-row " >
            <img className="mx-6 mt-6 rounded aspect-square justify-center sm:w-auto md:mb-6 md:h-36" src={imageSrc} alt={title} />
            <div className="flex flex-col m-6">
                <h5 className="text-xl font-medium text-white mb-2">
                    {title}
                </h5>
                <p class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 h-10 w-fit" >{state}</p>
                <p className="text-base text-white block">
                    {description}
                </p>

            </div>
        </div>
    );
};

export default GameDetails;
