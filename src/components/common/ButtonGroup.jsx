

import React from 'react';
import CustomBtn from './CustomButton';

const ButtonGroup = ({ label, onClick }) => {

    return (
        <div className='flex flex-row space-x-6 w-full justify-between md:justify-end md:max-w-xs '>
            <CustomBtn label="Register" />
            <CustomBtn label="Login" />
        </div>
    );
};

export default ButtonGroup;

