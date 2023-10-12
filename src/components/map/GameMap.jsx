import React, { useEffect, useState } from "react";
import CoordinateMaker from "./CoordinateMaker";
import { fetchCoordinates, addCoordinate } from '../../services/api'; // Import the API functions

const GameMap = () => {
  const [coordinates, setCoordinates] = useState([]);

  // Function to handle adding a coordinate
  const addCoordinateHandler = (newCoordinate) => {
    addCoordinate(newCoordinate)
      .then((response) => {
        // Update the state with the response coordinates
        setCoordinates([...coordinates, response]);
      })
      .catch((error) => {
        console.error('Error adding coordinate:', error);
      });
  };

  useEffect(() => {
    // Fetch coordinates from the API and update the state
    const fetchAndSetCoordinates = async () => {
      try {
        const fetchedCoordinates = await fetchCoordinates();
        // Update the state with the fetched coordinates
        setCoordinates(fetchedCoordinates);
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    fetchAndSetCoordinates();
  }, []);

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
                left: `${coordinate.xCoordinate}%`,
                top: `${coordinate.yCoordinate}%`,
              }}
            >
              {index + 1}
            </div>
          ))}
        </div>
        <CoordinateMaker onAddCoordinate={addCoordinateHandler} />
      </div>
    </div>
  );
};

export default GameMap;
