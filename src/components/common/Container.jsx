import React from 'react';

const Container = ({ children }) => {
    return (
        <div className="p-5 h-full bg-black bg-opacity-60 rounded-lg text-white w-full mb-10" style={{ height: '75vh', maxHeight: '75vh', overflowY: 'auto' }}>
            {children}
        </div>
    );
};

export default Container;
