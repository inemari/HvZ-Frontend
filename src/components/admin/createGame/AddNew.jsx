import React from 'react';
import add from '../../../assets/ui/add.png';


const NewGameBtn = ({ label, action }) => {

    return (
        // Button element with click handler
        <button className="bg-white bg-opacity-25 justify-center flex-row flex p-5 rounded-lg gap-3 hover:bg-opacity-40 font-bold" onClick={action}>
            <img src={add} alt="add icon" className="h-7 w-7" />{label}</button>

    );
};

export default NewGameBtn;
