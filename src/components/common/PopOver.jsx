// PopOver.js
import React from 'react';

const PopOver = ({ title, description, onClose, style }) => {
    return (
        <div
            data-popover
            id="popover-default"
            role="tooltip"
            className="absolute z-20 invisible inline-block w-64 text-sm  transition-opacity duration-300 border  rounded-lg shadow-sm opacity-0 text-gray-400 border-gray-600 bg-gray-800"
            style={style}
        >
            <div className="px-3 py-2 border-b  rounded-t-lg border-gray-600 bg-gray-700">
                <h3 className="font-semibold text-white">{title}</h3>
            </div>
            <div className="px-3 py-2">
                <p>{description}</p>
            </div>
            <div data-popper-arrow></div>
        </div>
    );
};

export default PopOver;
