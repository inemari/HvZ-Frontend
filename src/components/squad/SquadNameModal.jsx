import React, { useState } from "react";
import CustomButton from "../common/CustomButton";
import InputField from "../common/InputField";
import squadService, { addGameIdToSquad } from "../../api/services/squadService";

const SquadNameModal = ({ onSquadCreated, setIsSquadCreated }) => {
  // Initialize state variables to manage squad name and error messages
  const [squadName, setSquadName] = useState("");
  const [error, setError] = useState("");

  // Retrieve the selected game data from local storage
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const selectedGameId = selectedGame.id;

  // Function 'handleSubmit' is used to handle the submission of the squad name
  const handleSubmit = async () => {
    // Check if the squad name is not empty
    if (squadName.trim() === "") {
      setError("Squad name is required.");
    } else {
      try {
        // Step 1: Create a new squad
        const newSquad = await squadService.add({SquadName: squadName}); // Assuming createNewSquad returns the new squad object
        const squadId = newSquad.id; // Extract the squadId from the returned object
        // Step 2: Add the game ID to the squad
        await addGameIdToSquad(squadId, selectedGameId);

        // Notify the parent component that a squad has been created
        onSquadCreated();
        setIsSquadCreated(true);
      } catch (error) {
        setError("Failed to create squad");
      }
    }
  };

  return (
    <div className="w-full max-w-md p-6 text-center">
      <h2 className="text-xl font-medium mb-4 text-white">
        Create a new squad:
      </h2>
      <InputField
        error={error}
        value={squadName}
        onChange={(value) => setSquadName(value)}
        showIcon={true}
        iconPath="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
        placeholder="Enter squad name"
      />

      {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
      <div className="mt-4">
        <CustomButton
          type="submit"
          label={"Create Squad"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default SquadNameModal;
