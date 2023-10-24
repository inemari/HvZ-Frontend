import React, { useState } from "react";
import AddLocation from "../location/AddLocation";
import InputAdmin from "../common/CustomInput";

// MissionInput component responsible for entering mission details
const MissionInput = ({ gameId, onAddMission, closeModal }) => {
  const missionEntity = {
    name: "",
    description: "",
  };
  const [missionFormData, setMissionFormData] = useState(missionEntity);
  
   // Handle input changes for mission name and description
  const handleInputChange = (e) => {
    const updatedFormData = { ...missionFormData };
    updatedFormData[e.target.name] = e.target.value;
    setMissionFormData(updatedFormData);
  };
  
  // Handle adding a mission, including its location
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
    <div className="gap-3 w-full md:col-span-1 col-span-full">

      <h1 className="text-3xl md:text-4xl font-bold mt-2 pb-3">Add Mission</h1>
      <InputAdmin
        label="Mission Name"
        textComponent="input"
        type="text"
        fieldname="name"
        field={missionFormData.title}
        onChange={handleInputChange}
        TooltipContent={"Enter the name or title of this mission. Be concise and descriptive."}
        required />

      <InputAdmin
        label="Mission description"
        textComponent="input"
        type="text"
        fieldname="description"
        field={missionFormData.description}
        onChange={handleInputChange}
        TooltipContent={"Provide a brief description of this mission. What is its objective or purpose?"}
        required />

      <AddLocation
        gameId={gameId}
        onAddLocation={handleAddMission}
        closeModal={closeModal}
      />
    </div>
  );
};

export default MissionInput;
