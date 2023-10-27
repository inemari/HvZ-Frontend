import React, { useState } from 'react';

// AddMarker component allows users to add a marker at the current coordinates
// Props:
// - onAddMarker: A function to handle marker addition
// - closeModal: A function to close the modal
const AddMarker = ({ onAddMarker, closeModal }) => {
  const [currentCoordinate, setCurrentCoordinate] = useState({ x: 0, y: 0 });

  // Handler for adding a marker
  const handleAddMarker = () => {
    // Create a location object
    const locationData = {
      xCoordinate: currentCoordinate.x,
      yCoordinate: currentCoordinate.y,
    };

    // Notify the parent component that a marker has been added
    onAddMarker(locationData); // Pass the location data to the parent

    // Close the modal after successfully adding the marker
    closeModal();

    // Reset the form
    setCurrentCoordinate({ x: 0, y: 0 });
  };

  return (
    <div className="left-3.5 bottom-3.5 p-4 rounded-lg">
      <div className="mb-2">
        <label className="block font-semibold">X Coordinate:</label>
        <input
          type="number"
          value={currentCoordinate.x}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={(e) =>
            setCurrentCoordinate({
              ...currentCoordinate,
              x: parseInt(e.target.value),
            })
          }
        />
      </div>
      <div>
        <label className="block font-semibold">Y Coordinate:</label>
        <input
          type="number"
          value={currentCoordinate.y}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={(e) =>
            setCurrentCoordinate({
              ...currentCoordinate,
              y: parseInt(e.target.value),
            })
          }
        />
      </div>
      <button
        className="bg-blue-500 text-white rounded p-2 text-sm hover-bg-blue-600 cursor-pointer"
        onClick={handleAddMarker}
      >
        Add Marker
      </button>
    </div>
  );
};

export default AddMarker;


