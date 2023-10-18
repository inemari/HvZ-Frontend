import React, { useState } from 'react';
import AddMarker from '../map/markers/AddMarker';

const MissionInput = ({ gameId, onAddMission, closeModal }) => {
  const [missionName, setMissionName] = useState('');
  const [missionDescription, setMissionDescription] = useState('');
  const [currentCoordinate, setCurrentCoordinate] = useState({ x: 0, y: 0 });

  // Handler for when a marker is added
  const handleMarkerAdded = (locationData) => {
    // Create a mission object
    const missionData = {
      name: missionName,
      description: missionDescription,
    };

    // Pass the mission object to the parent component
    onAddMission(missionData, locationData);

    // Close the modal and reset the form
    closeModal();
    setMissionName('');
    setMissionDescription('');
    setCurrentCoordinate({ x: 0, y: 0 });
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block font-semibold">Mission Name:</label>
        <input
          type="text"
          value={missionName}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={(e) => setMissionName(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Mission Description:</label>
        <input
          type="text"
          value={missionDescription}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={(e) => setMissionDescription(e.target.value)}
        />
      </div>
      <AddMarker gameId={gameId} onAddMarker={handleMarkerAdded} closeModal={closeModal} />
    </div>
  );
};

export default MissionInput;
