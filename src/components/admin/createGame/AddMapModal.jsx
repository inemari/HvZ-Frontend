import React, { useState } from "react";

// Using Webpack's require.context to import images from a specific folder
const mapFolder = require.context("../../../assets/images/maps", false, /\.(png|jpe?g|svg)$/);

const AddMap = ({ handleInputChange }) => {
  const [selectedImageKey, setSelectedImageKey] = useState(""); // Initialize the selectedImageKey state
  const imagePaths = mapFolder.keys();

  return (
    <div className="grid grid-cols-2 gap-5">
      {imagePaths.map((path, index) => (
        <div className="grid col-span-1 justify-center ">
          <img

            key={index}
            src={mapFolder(path)}
            alt={path}
            onClick={() => {
              setSelectedImageKey(path); // Set the selected image key
              handleInputChange({ target: { name: "pictureURL", value: mapFolder(path) } });
            }}
            className={`object-cover rounded aspect-video ${selectedImageKey === path ? "border-4 border-customOrange" : ""}`}
          />
          <p className="mb-2 text-lg ">{path}</p>
        </div>
      ))}

    </div>

  );
};

export default AddMap;









/* import React from "react";
import map1 from '../../../assets/images/maps/Map1.png';
import map2 from '../../../assets/images/maps/Map2.png';


const AddMap = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-bold">Select map:</h2>
      <form>
        <div className="mb-4">
          <label className="block text-base">Choose map:</label>
          <input
            type="text"
            name="pictureURL"
            value={formData.pictureURL}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-3 text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default AddMap; */