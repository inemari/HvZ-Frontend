import React from 'react';

const GameContainer = ({ children }) => {
    return (
        <div className="w-full p-5 justify-center flex flex-wrap bg-black bg-opacity-60 rounded-lg " >
            {children}
        </div>
    );
};

export default GameContainer;
