import React, { useState } from 'react';
import { createMission } from '../../services/mapService'; // Import createMission function
import AddMarker from '../map/markers/addMarker';




const MissionInput = ({ gameId, onAddCoordinate }) => {
  const [missionName, setMissionName] = useState('');
  const [missionDescription, setMissionDescription] = useState('');

  // Handler for when a marker is added
  const handleMarkerAdded = (markerData) => {
    // You can perform any action you need with the marker data here
    // For example, creating a mission with the marker data
    createMission({
      name: missionName,
      description: missionDescription,
      gameId: gameId,
      locationId: markerData.locationId,
    });

    // Notify the parent component that a coordinate has been added
    onAddCoordinate(markerData);
  };

  return (
    <div>
      {/* Add the AddMarker component */}
      <AddMarker gameId={gameId} onAddMarker={handleMarkerAdded} />

      <div className="mb-2">
        <label className="block font-semibold">Mission Name:</label>
        <input
          type="text"
          value={missionName}
          onChange={(e) => setMissionName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Mission Description:</label>
        <input
          type="text"
          value={missionDescription}
          onChange={(e) => setMissionDescription(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MissionInput;
