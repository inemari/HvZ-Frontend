import React, { useState } from "react";
import AddLocation from "../location/AddLocation";

const MissionInput = ({ gameId, onAddMission, closeModal }) => {
  const missionEntity = {
    name: "",
    description: "",
  };
  const [missionFormData, setMissionFormData] = useState(missionEntity);

  const handleInputChange = (e) => {
    const updatedFormData = { ...missionFormData };
    updatedFormData[e.target.name] = e.target.value;
    setMissionFormData(updatedFormData);
  };

  const handleAddMission = (locationData) => {
    // Create a mission object using missionFormData
    const missionObject = { ...missionFormData };

    // Pass the mission object and location data to the parent component
    onAddMission(missionObject, locationData);

    // Close the modal and reset the form
    closeModal();
    setMissionFormData(missionEntity); // Reset to initial state
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block font-semibold">Mission Name:</label>
        <input
          type="text"
          name="name"
          value={missionFormData.name}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block font-semibold">Mission Description:</label>
        <input
          type="text"
          name="description"
          value={missionFormData.description}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={handleInputChange}
        />
      </div>
      <AddLocation
        gameId={gameId}
        onAddLocation={handleAddMission}
        closeModal={closeModal}
      />
    </div>
  );
};

export default MissionInput;
