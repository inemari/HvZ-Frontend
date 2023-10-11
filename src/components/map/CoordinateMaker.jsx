import React, { useState } from 'react';

const CoordinateMaker = ({ onAddCoordinate }) => {
  const [currentCoordinate, setCurrentCoordinate] = useState({ x: 0, y: 0 });

  const addCoordinate = () => {
    onAddCoordinate(currentCoordinate);
    setCurrentCoordinate({ x: 0, y: 0 });
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
          onChange={(e) =>
            setCurrentCoordinate({
              ...currentCoordinate,
              y: parseInt(e.target.value),
            })
          }
        />
      </div>
      <button
        className="bg-blue-500 text-white rounded p-2 text-sm hover:bg-blue-600 cursor-pointer"
        onClick={addCoordinate}
      >
        Add Coordinate
      </button>
    </div>
  );
};
export default CoordinateMaker;