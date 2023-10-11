import React, { useState } from "react";
import CoordinateMaker from "./CoordinateMaker";

const GameMap = () => {
  const [coordinates, setCoordinates] = useState([]);

  const addCoordinate = (newCoordinate) => {
    setCoordinates([...coordinates, newCoordinate]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto p-8 bg-gray-600 rounded-lg">
        <div className="relative aspect-square bg-gray-600">
          {/* Render the coordinates as red dots */}
          {coordinates.map((coordinate, index) => (
            <div
              key={index}
              className="absolute bg-red-500 text-white w-6 h-6 rounded-full text-center"
              style={{
                left: `${coordinate.x}%`,
                top: `${coordinate.y}%`,
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <CoordinateMaker onAddCoordinate={addCoordinate} />
      </div>
    </div>
  );
};

export default GameMap;
