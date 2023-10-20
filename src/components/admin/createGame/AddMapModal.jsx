import React, { useState } from "react";

const mapFolder = require.context("../../../assets/images/maps", false, /\.(png|jpe?g|svg)$/);

const AddMap = ({ handleInputChange }) => {
  const [selectedImageKey, setSelectedImageKey] = useState(""); // Initialize the selectedImageKey state

  const imagePaths = mapFolder.keys();

  return (
    <div className=" rounded-xl p-5  justify-center grid grid-flow-row">
      <h1 className="text-lg md:text-2xl font-bold text-center row-span-1">Step 2:</h1>
      <h2 className="text-lg md:text-2xl font-semibold text-center">Choose map</h2>
      <label className="block text-base"><b>Selected map:</b>{selectedImageKey}</label>
      <div className="grid grid-flow-col text-center gap-6">
        {imagePaths.map((path, index) => (
          <div>
            <img

              key={index}
              src={mapFolder(path)}
              alt={path}
              onClick={() => {
                setSelectedImageKey(path); // Set the selected image key
                handleInputChange({ target: { name: "pictureURL", value: mapFolder(path) } });
              }}
              className={`max-h-72 rounded aspect-square m-auto ${selectedImageKey === path ? "border-4 border-customOrange" : ""}`}
            />
            <p className="mb-2 text-lg ">{path}</p>
          </div>
        ))}
      </div>

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