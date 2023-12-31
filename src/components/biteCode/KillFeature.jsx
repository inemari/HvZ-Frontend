import React, { useState } from "react";
import InputField from "../common/InputField";
import CustomButton from "../common/CustomButton";
import ModalContainer from "../common/ModalContainer";
import locationService from "../../api/services/locationService";
import playerService, { setZombieToTrue, getPlayerByBiteCode }from "../../api/services/playerService";
import killService from "../../api/services/killService";

// KillFeature component provides a feature for handling kills within a game.
const KillFeature = () => {
  // State variables for managing kill feature data and interaction
  const [bitecode, setBitecode] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isKilled, setIsKilled] = useState(false);
  const [killInfo, setKillInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [player, setPlayer] = useState("");
  
   // Retrieve the selected game from local storage
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const gameId = selectedGame.id;
  
  // Function to handle the process of a player being killed
  const handleKill = async () => {
    try {
      if (bitecode.trim() === "") {
        setError("Bitecode is required.");
        return;
      }
      // Try to set the player to a zombie
      const response = await setZombieToTrue(bitecode, gameId);

      if (typeof response === "string") {
        // If `setZombieToTrue` returned an error message
        setError(response);
        console.log("errorresponse", response);
      } else {
        // If `setZombieToTrue` returned a response
        setShowModal(true);
        setError("");
      }
    } catch (error) {
      setError("Failed to create kill");
      console.error("Error handling kill:", error);
    }
  };
  
  // Function to handle the creation of a kill
  const handleCreateKill = async () => {
    const player = await getPlayerByBiteCode(bitecode);
    setPlayer(player);

    const location = await locationService.getById(player.locationId);
    const locationResponse = await locationService.add({
      xCoordinate: location.xCoordinate,
      yCoordinate: location.yCoordinate,
    });

    const killData = await createKill(player.id, locationResponse.id);
    setIsKilled(true);
    setKillInfo(killData);

    // Clear the description and reset the state when the user successfully creates a kill
    setDescription("");
  };
  
  // Function to create a kill with player and location information
  async function createKill(playerId, locationId) {
    try {
      const date = new Date();
      const formattedTime = date.toISOString();

      const killData = {
        playerId: playerId,
        description: description,
        timeOfKill: formattedTime,
        locationId: locationId,
      };
      
      // Attempt to create a new kill record with the provided killData
      const killResponse = await killService.add(killData);
      setShowModal(false);
      return killResponse;
    } catch (error) {
      console.error("Error creating kill:", error);
      throw error;
    }
  }

  return (
    <div className="w-full max-w-md p-6 text-center">
      <h2 className="text-xl font-medium mb-4 text-white">
        Enter bitecode to turn a human into a zombie:
      </h2>
      <InputField
        label="Enter bitecode"
        error={error}
        value={bitecode}
        onChange={(value) => setBitecode(value)}
        showIcon={true}
        iconPath="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
        placeholder="Enter the bitecode"
      />
      {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
      <div className="mt-4">
        <CustomButton
          label={isKilled ? "Killed" : "Kill"}
          className={`bg-blue-500 ${
            isKilled ? "bg-blue-700" : "hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          onClick={handleKill}
          disabled={isKilled || showModal}
        >
          {isKilled ? "Killed" : "Kill"}
        </CustomButton>
        {isKilled && killInfo ? (
          <div>
            <p className="text-white">
              {player.username} got killed at{" "}
              {new Date(killInfo.timeOfKill).toLocaleString()}
            </p>
            <p className="text-white">Cause of death: {killInfo.description}</p>
          </div>
        ) : null}
      </div>

      {showModal && (
        <ModalContainer
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        >
          <div className="p-6">
            <h2 className="text-xl font-medium mb-4 text-white">
              Enter description for the kill:
            </h2>
            <InputField
              label="Enter description"
              value={description}
              onChange={(value) => setDescription(value)}
              showIcon={false}
              placeholder="Enter the kill description"
            />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <div className="mt-4">
              <CustomButton
                label="Create Kill"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateKill}
              >
                Create Kill
              </CustomButton>
            </div>
          </div>
        </ModalContainer>
      )}
    </div>
  );
};

export default KillFeature;
