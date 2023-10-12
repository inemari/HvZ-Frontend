import React, { useState } from 'react';
import { addCoordinate } from '../../services/api'; // Import the API function

const CoordinateMaker = ({ onAddCoordinate }) => {
  // Initialize state for the current coordinate with default values (x: 0, y: 0)
  const [currentCoordinate, setCurrentCoordinate] = useState({ x: 0, y: 0 });

  // Function to handle adding a coordinate
  const handleAddCoordinate = async () => {
    try {
      // Parse the input values as numbers
      const x = parseFloat(currentCoordinate.x);
      const y = parseFloat(currentCoordinate.y);

      // Check if the parsed values are valid numbers
      if (isNaN(x) || isNaN(y)) {
        console.error('Invalid coordinate values');
        return; // Prevent making the API call if values are not valid
      }

      // Create a new coordinate object with parsed values
      const newCoordinate = await addCoordinate({ xCoordinate: x, yCoordinate: y });

      // Add the returned coordinate to the state
      onAddCoordinate(newCoordinate);

      // Reset the current coordinate to default values
      setCurrentCoordinate({ x: 0, y: 0 });
    } catch (error) {
      console.error('Error adding coordinate:', error);
    }
  };

  return (
    <div className="absolute left-3.5 bottom-3.5 p-4 bg-white rounded-lg">
      <div className="mb-2">
        <label className="block font-semibold">X Coordinate:</label>
        <input
          type="number"
          value={currentCoordinate.x}
          onChange={(e) =>
            setCurrentCoordinate({
              ...currentCoordinate,
              x: e.target.value, // Keep as a string
            })
          }
        />
      </div>
      <div>
        <label className="block font-semibold">Y Coordinate:</label>
        <input
          type="number"
          value={currentCoordinate.y}
          onChange={(e) =>
            setCurrentCoordinate({
              ...currentCoordinate,
              y: e.target.value, // Keep as a string
            })
          }
        />
      </div>
      <button
        className="bg-blue-500 text-white rounded p-2 text-sm hover-bg-blue-600 cursor-pointer"
        onClick={handleAddCoordinate} // Updated to use the API call
      >
        Add Coordinate
      </button>
    </div>
  );
};

export default CoordinateMaker;
