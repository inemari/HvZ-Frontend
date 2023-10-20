import React from 'react';
import CustomButton from '../common/CustomButton';
import add from '../../assets/ui/add.png';
import { useNavigate } from 'react-router-dom';
const NewGameBtn = () => {
    const navigate = useNavigate();
    return (
        <div className="z-20  bottom-0 right-0 px-14 absolute  py-2">
            <CustomButton className="" label={"Create new game"} icon={add} rounded="3xl" iconPosition={'before'} onClick={() => navigate('/Admin')} />
        </div>
    );
};

export default NewGameBtn;
