import React, { useState } from 'react';
import { postLocation } from '../../../services/locationService';

const AddMarker = ({ gameId, onAddMarker, closeModal }) => {
  const [currentCoordinate, setCurrentCoordinate] = useState({ x: 0, y: 0 });

  const createMarker = async () => {
    try {
      // Call the function to add the marker to the backend

      const newLocation = {
        xCoordinate: currentCoordinate.x,
        yCoordinate: currentCoordinate.y,
      };

      // Call the function to create the location
      console.log("newlocation", newLocation);
      await postLocation(newLocation);

      // Notify the parent component that a marker has been added
      onAddMarker();

      // Close the modal after successfully adding the marker
      closeModal();

      // Reset the form
      setCurrentCoordinate({ x: 0, y: 0 });
    } catch (error) {
      console.error('Failed to add marker:', error);
    }
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
        onClick={createMarker}
      >
        Add Marker
      </button>
    </div>
  );
};

export default AddMarker;

