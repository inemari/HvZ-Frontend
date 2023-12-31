import React, { useState } from "react";
import AddLocation from "../location/AddLocation";
import InputAdmin from "../common/CustomInput";

// MissionInput component allows users to input mission details and create a mission
// Props:
// - gameId: The ID of the game to which the mission belongs
// - onAddMission: A function to handle adding a mission with its location data
// - closeModal: A function to close the modal
const MissionInput = ({ gameId, onAddMission, closeModal }) => {
  const missionEntity = {
    name: "",
    description: "",
  };
  const [missionFormData, setMissionFormData] = useState(missionEntity);

  // handleInputChange function is used to update the missionFormData state when input fields change
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

    setMissionFormData(missionEntity); // Reset to initial state
    closeModal();
  };

  return (
    <div className="gap-3 w-full md:col-span-1 col-span-full">

      <h1 className="text-3xl md:text-4xl font-bold mt-2 pb-3">Add Mission</h1>
      <InputAdmin
        label="Mission Name"
        textComponent="input"
        type="text"
        fieldname="name"
        value={missionFormData.name}
        onChange={handleInputChange}
        TooltipContent={"Enter the name or title of this mission. Be concise and descriptive."}
        required />

      <InputAdmin
        label="Mission description"
        textComponent="input"
        type="text"
        fieldname="description"
        value={missionFormData.description}
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
