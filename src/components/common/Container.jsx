import React from 'react';

const Container = ({ children }) => {
    return (
        <div className="w-full p-5 justify-center flex flex-wrap bg-black bg-opacity-60 rounded-lg text-white mb-10" style={{ maxHeight: 'calc(90vh - 200px)', overflowY: 'auto' }}>
            {children}
        </div>
    );
};

export default Container;
