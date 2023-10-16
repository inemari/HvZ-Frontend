import React, { useState } from 'react';
import AddMarker from '../map/markers/AddMarker';
import { postMission } from '../../services/missionService';

const MissionInput = ({ gameId, onAddMission, closeModal }) => {
  const [missionName, setMissionName] = useState('');
  const [missionDescription, setMissionDescription] = useState('');

  // Handler for when a marker is added
  const handleMarkerAdded = async (markerData) => {
    try {
      const response = await postMission({
        name: missionName,
        description: missionDescription,
      });

      // Notify the parent component that a mission has been added
      onAddMission(response); // Pass the response data to the parent

      // Close the modal after successfully creating the mission
      closeModal();
    } catch (error) {
      console.error('Failed to post mission:', error);
    }
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
      <AddMarker gameId={gameId} onAddMarker={handleMarkerAdded} />
    </div>
  );
};

export default MissionInput;