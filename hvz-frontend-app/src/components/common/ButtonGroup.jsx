

import React from 'react';
import Button from './Button';

const ButtonGroup = ({ label, onClick }) => {

    return (
        <div className='flex flex-row space-x-6 w-full justify-between md:justify-end md:max-w-xs'>
            <Button label="Register" />
            <Button label="Login" />
        </div>
    );
};

export default ButtonGroup;

