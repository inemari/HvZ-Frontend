import React from "react";
import InputAdmin from "../../common/InputAdmin";


const GameInfoInput = ({ gameFormData, handleInputChange }) => {

  return (

    <div className='flex flex-col pb-5 w-full justify-between top-0 gap-3'>

        <InputAdmin
          label="Title"
          textComponent="input"
          type="text"
          fieldname="title"
          field={gameFormData.title}
          onChange={handleInputChange}
          id="title"
          TooltipContent={"Give the game a existing title."}
          required />

        {/* For edit game page: */}
        {/* <h2 className="text-lg font-bold ">ABOUT GAME</h2> */}

        <InputAdmin
          label="Description"
          textComponent="textarea"
          type="text"
          name="description"
          value={gameFormData.description}
          onChange={handleInputChange}
          id="decription"
          TooltipContent="Enter a detailed description of the game, to let players know what to expect and why this game is exciting and unique."
        /></div>
  );
};

export default GameInfoInput;
