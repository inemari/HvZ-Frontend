import React from "react";
import InputAdmin from "../../common/CustomInput";

// GameInfoInput component provides input fields for game title, description, and image URL, allowing users to enter game information
const GameInfoInput = ({
  gameFormData,
  handleInputChange,
  handleImageUrlChange,
}) => {
  return (
    <div className="flex flex-col pb-5 w-full justify-between top-0 gap-3">
      <InputAdmin
        label="Title"
        textComponent="input"
        type="text"
        fieldname="title"
        value={gameFormData.title}
        onChange={handleInputChange}
        id="title"
        TooltipContent={"Give the game an exiting title."}
        required
      />
      <InputAdmin
        label="Description"
        textComponent="textarea"
        type="text"
        fieldname="description"
        value={gameFormData.description}
        onChange={handleInputChange}
        id="decription"
        TooltipContent="Enter a detailed description of the game, to let players know what to expect and why this game is exciting and unique."
      />

      <InputAdmin
        label="Image URL"
        textComponent="input"
        type="url"
        fieldname="pictureURL"
        value={gameFormData.pictureURL}
        onChange={handleImageUrlChange}
        id="pictureURL"
        TooltipContent={
          "Insert a URL for the image you would like to represent the game."
        }
        required
      />
    </div>
  );
};
export default GameInfoInput;
