// PopOver.js
import React from 'react';

const PopOver = ({ title, description, onClose, style }) => {
    return (
        <div
            data-popover
            id="popover-default"
            role="tooltip"
            className="absolute z-20 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
            style={style}
        >
            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
            </div>
            <div className="px-3 py-2">
                <p>{description}</p>
            </div>
            <div data-popper-arrow></div>
        </div>
    );
};

export default PopOver;
