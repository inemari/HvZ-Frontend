import React from 'react';
import { useLocation } from 'react-router-dom';

// Container component provides a dynamic container with adjustable height and scrolling based on the current page.
const Container = ({ children }) => {
    const location = useLocation();
    const containerSize = {
        height: location.pathname !== 'LandingPage' ? '80vh' : '90vh',
        overflowY: 'auto',
    };
    return (
        <div className="mt-auto  align-self-center my-auto p-10 bg-black bg-opacity-60 rounded-lg text-white w-full justify-center shadow-customLightBrown shadow-sm" style={containerSize}>
            {children}
        </div >
    );
};

export default Container;
