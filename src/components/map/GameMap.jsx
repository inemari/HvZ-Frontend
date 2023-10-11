import React, { useState } from "react";
import CoordinateMaker from "./CoordinateMaker"; // Corrected the import path

const GameMap = () => {
  const [coordinates, setCoordinates] = useState([]);

  const addCoordinate = (newCoordinate) => {
    setCoordinates([...coordinates, newCoordinate]);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="container mx-auto p-8 bg-gray-600 rounded-lg">
        <div className="relative aspect-square bg-gray-600">
          {/* Render the coordinates... */}
        </div>
        <CoordinateMaker onAddCoordinate={addCoordinate} />
      </div>
    </div>
  );
};

export default GameMap;
