import React from 'react';

const Container = ({ children }) => {
    return (
        <div className="p-10 h-full bg-black bg-opacity-60 rounded-lg text-white w-full mb-5 justify-center" style={{ height: '80vh', maxHeight: '100vh', overflowY: 'auto' }}>
            {children}
        </div>
    );
};

export default Container;
