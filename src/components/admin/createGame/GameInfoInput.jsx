import React from "react";
import InputAdmin from "../../common/CustomInput";

const GameInfoInput = ({ gameFormData, handleInputChange, defaultDescription, defaultTitle }) => {
  return (
    <div className='flex flex-col pb-5 w-full justify-between top-0 gap-3'>
      <InputAdmin
        label="Title"
        textComponent="input"
        type="text"
        fieldname="title"
        value={gameFormData.title}
        onChange={handleInputChange}
        id="title"
        TooltipContent={"Give the game an exiting title."}
        defaultContent={defaultTitle}
        required
      />
      <InputAdmin
        label="Description"
        textComponent="textarea"
        type="text"
        name="description"
        value={gameFormData.description || defaultDescription} // Use gameFormData.description or defaultContent2 if empty
        onChange={handleInputChange}
        id="decription"
        TooltipContent="Enter a detailed description of the game, to let players know what to expect and why this game is exciting and unique."
        defaultContent={defaultDescription}
      />
    </div>
  );
};
export default GameInfoInput;
