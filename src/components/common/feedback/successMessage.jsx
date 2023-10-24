import React from 'react';

const SuccessMessage = ({ header, message }) => {

    return (
        // Container for a success message with specific styling
        <div class="h-screen w-screen absolute justfy-start top-0 right-0 left-0" role="alert">
            <div class="flex border-teal-500  w-full text-teal-900 bg-teal-100 p-5 absolute test-center top-0 right-0 left-0 z-50 shadow-md">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4  " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" /></svg></div>
                <div>
                    <p class="font-bold">{header}</p>
                    <p class="text-sm">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default SuccessMessage;
