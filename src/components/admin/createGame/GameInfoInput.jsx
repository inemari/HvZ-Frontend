import React from "react";
import InputAdmin from "../../common/CustomInput";

const GameInfoInput = ({
  gameFormData,
  handleInputChange,
  defaultDescription,
  defaultTitle,
  handleImageUrlChange
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
        //defaultContent={defaultTitle}
        required
      />
      <InputAdmin
        label="Description"
        textComponent="textarea"
        type="text"
        fieldname="description"
        value={gameFormData.description} // Use gameFormData.description or defaultContent2 if empty
        onChange={handleInputChange}
        id="decription"
        TooltipContent="Enter a detailed description of the game, to let players know what to expect and why this game is exciting and unique."
        //defaultContent={defaultDescription}
      />

      <InputAdmin
        label="Image URL"
        textComponent="input"
        type="url"
        fieldname="pictureURL" // Use the correct field name here
        value={gameFormData.pictureURL}
        onChange={handleImageUrlChange}
        id="pictureURL"
        TooltipContent={
          "Insert a URL for the image you would like to represent the game."
        }
        /*               defaultContent={
                gameEntity.imgUrl === noImage && editMode
                  ? gameEntity.imgUrl
                  : imageUrl
              } */
        required
      />
    </div>
  );
};
export default GameInfoInput;
