import React from 'react';
import CustomButton from '../common/CustomButton';
import add from '../../assets/ui/add.png';
const NewGameBtn = () => {
    return (
        <div className=" bottom-4 right-4 z-20 fixed py-2 shadow-lg">
            <CustomButton label={"Create new game"} icon={add} rounded="3xl" iconPosition={'before'} />


        </div>
    );
};

export default NewGameBtn;
