import React, { useState } from "react";

// Import images from a specified folder
const mapFolder = require.context(
  "../../../assets/images/maps",
  false,
  /\.(png|jpe?g|svg)$/
);

// AddMap component displays a grid of images and allows selection of a map
// Props:
// - handleInputChange: A function to handle input changes
const AddMap = ({ handleInputChange }) => {
  // Initialize the selectedImageKey state
  const [selectedImageKey, setSelectedImageKey] = useState("");

  // Get a list of image file paths from the imported folder
  const imagePaths = mapFolder.keys();

  return (
    // Displays all the maps in a grid layout
    <div className="grid grid-cols-2 gap-5">
      {imagePaths.map((path, index) => (
        <div className="grid col-span-1 justify-center ">
          <img
            key={index}
            src={mapFolder(path)}
            alt={path}
            onClick={() => {
              // Set the selected image key when an image is clicked
              setSelectedImageKey(path);
              // Call the handleInputChange function with the selected image's URL
              handleInputChange({
                target: { name: "mapURL", value: mapFolder(path) },
              });
            }}
            className={`object-cover rounded aspect-video ${
              selectedImageKey === path ? "border-4 border-customOrange" : ""
            }`}
          />
          <p className="mb-2 text-lg ">{path}</p>
        </div>
      ))}
    </div>
  );
};

export default AddMap;
