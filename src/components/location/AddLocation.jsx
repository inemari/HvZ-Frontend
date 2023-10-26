import React, { useState } from "react";

const AddLocation = ({ onAddLocation, closeModal }) => {
  const locationEntity = {
    xCoordinate: "",
    yCoordinate: "",
  };
  const [locationFormData, setLocationFormData] = useState(locationEntity);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLocationFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for adding a marker
  const handleAddLocation = (object) => {
    // Create a location object
    const locationData = { ...locationFormData };

    // Notify the parent component that a marker has been added
    onAddLocation(object, locationData); // Pass the location data to the parent

    // Close the modal after successfully adding the marker

    setLocationFormData(locationEntity);
  };

  return (
    <div className="left-3.5 bottom-3.5 p-4 rounded-lg">
      <div className="mb-2">
        <label className="block font-semibold">X Coordinate:</label>
        <input
          type="number"
          name="xCoordinate"
          value={locationFormData.xCoordinate}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block font-semibold">Y Coordinate:</label>
        <input
          type="number"
          name="yCoordinate"
          value={locationFormData.yCoordinate}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={handleInputChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white rounded p-2 text-sm hover:bg-blue-600 cursor-pointer"
        onClick={handleAddLocation}
      >
        Add Location
      </button>
    </div>
  );
};

export default AddLocation;
