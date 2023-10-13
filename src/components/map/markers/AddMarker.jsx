import React, { useState } from 'react';
import { addCoordinateToMission, createLocation } from '../../../services/mapService';

const AddMarker = ({ gameId, onAddMarker }) => {
    const [currentCoordinate, setCurrentCoordinate] = useState({ x: 0, y: 0 });

    const createMarker = async () => {
        try {
            // Call the function to add the marker to the backend
            const response = await addCoordinateToMission(
                currentCoordinate.x,
                currentCoordinate.y,
                gameId
            );

            // Create a new location with the response data
            const newLocation = {
                xCoordinate: currentCoordinate.x,
                yCoordinate: currentCoordinate.y,
                // You can add other properties if needed
            };

            // Call the function to create the location
            await createLocation(newLocation);

            // Notify the parent component that a marker has been added with the response data
            onAddMarker(response);

            // Reset the form
            setCurrentCoordinate({ x: 0, y: 0 });
        } catch (error) {
            console.error('Failed to add marker:', error);
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
                onClick={createMarker}
            >
                Add Marker
            </button>
        </div>
    );
};

export default AddMarker;
