import React, { useState, useEffect } from "react";
import AddTitle from "./AddTitle";
import AddMapModal from "./AddMapModal";
import AddDescription from "./AddDescription";
import MissionInput from "../../missions/MissionInput";
import { postGame } from "../../../services/gameService";
import MissionContainer from "../../common/ModalContainer";
import RuleContainer from "../../common/ModalContainer";
import Map from "../../map/Map";
import RuleInput from "../../rule/ruleInput";
import { postMission } from "../../../services/missionService";
import { postLocation } from "../../../services/locationService";
import { postRule } from "../../../services/ruleService";

const CreateGameContainer = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pictureURL: "",
  });

  const [missionObjects, setMissionObjects] = useState([]);
  const [locationObjects, setLocationObjects] = useState([]);
  
  const [ruleObjects, setRuleObjects] = useState([]);
  // State to control the modal visibility
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [gameCreated, setGameCreated] = useState(false); // Track whether the game is created
  const [gameId, setGameId] = useState(null); // Track the created game's ID

  // Function to open the mission modal
  const openMissionModal = () => {
    setIsMissionModalOpen(true);
  };

  // Function to open the map modal
  const openRuleModal = () => {
    setIsRuleModalOpen(true);
  };

  // Function to close both modals
  const closeModal = () => {
    setIsMissionModalOpen(false);
    setIsRuleModalOpen(false);
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // Callback function to add the mission to missionObjects
  const handleAddMission = (missionData, locationData) => {
    setMissionObjects((prevMissions) => [...prevMissions, missionData]);
    setLocationObjects((prevLocations) => [...prevLocations, locationData]);
  };

  const handleAddRule = (ruleData) => {
    setRuleObjects((prevRules) => [
      ...prevRules,
      {
        id: ruleData.id,
        title: ruleData.title,
      },
    ]);
  };

  const handleAddMarker = (locationData) => {
    setLocationObjects((prevLocations) => [
      ...prevLocations,
      locationData,
    ]);
  };

  const handleInputChange = (e) => {
    const updatedFormData = { ...formData };
    updatedFormData[e.target.name] = e.target.value;
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Step 1: Create the game
    const { title, description, pictureURL } = formData;
  
    const gameResponse = await postGame({ title, description, pictureURL });

    const missionsToCreate = [];
    for (let i = 0; i < missionObjects.length; i++) {
      const missionData = missionObjects[i];
      missionsToCreate.push(missionData);
    }
  
    // Call your API to create missions in the database
    for (const missionData of missionsToCreate) {
      try {
        const response = await postMission(missionData);
  
        // Handle the response, e.g., update state or perform other actions
        // ...
      } catch (error) {
        console.error('Failed to post mission:', error);
      }
    }

    const locationsToCreate = [];
  for (let i = 0; i < locationObjects.length; i++) {
    const locationData = locationObjects[i];
    locationsToCreate.push(locationData);
  }

  // Call your API to create locations in the database
  for (const locationData of locationsToCreate) {
    try {
      await postLocation(locationData);

      // Handle the response or errors as needed
      // ...
    } catch (error) {
      console.error('Failed to add location:', error);
    }
    }
    

  // Create rules
  const rulesToCreate = [];
  for (let i = 0; i < ruleObjects.length; i++) {
    const ruleData = ruleObjects[i];
    rulesToCreate.push(ruleData);
  }

  // Call your API to create rules in the database
  for (const ruleData of rulesToCreate) {
    try {
      await postRule(ruleData); // Replace postRule with your actual API call

      // Handle the response or errors as needed
      // ...
    } catch (error) {
      console.error('Failed to add rule:', error);
    }
  }


    if (gameResponse && gameResponse.id) {
      const gameId = gameResponse.id;
  
      setGameCreated(true);
      setGameId(gameId);
  
      // Show the success message
      setShowSuccessMessage(true);
  
      // Update the title and description placeholders
      setFormData({
        title: "",
        description: "",
        pictureURL: "",
      });
  
      setMissionObjects([]);
      setRuleObjects([]);
  
      // Hide the success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // 3000 milliseconds = 3 seconds
    }
  };
  

  useEffect(() => {
    // You can use this effect to clear the page or perform any additional actions
    // when the success message is hidden (e.g., redirect to another page).
    if (!showSuccessMessage) {
      // Clear the page or perform other actions here
    }
  }, [showSuccessMessage]);

  return (
    <div
      className="container mx-auto p-6 bg-black bg-opacity-60 rounded-lg text-white"
      style={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between">
          <div className="w-full p-10 md:w-1/3">
            <AddMapModal
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
          <div className="w-full p-10 md:w-2/3">
            <AddTitle
              formData={formData}
              handleInputChange={handleInputChange}
              placeholder={gameCreated}
            />
            <AddDescription
              formData={formData}
              handleInputChange={handleInputChange}
              placeholder={gameCreated}
            />
            <div>
              <h2 className="text-lg md:text-xl font-bold">Missions:</h2>
              <ul>
                {missionObjects.map((mission, index) => (
                  <li key={index}>{mission.name}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={openMissionModal}
                className="bg-green-500 text-white py-2 px-4 rounded ml-4"
              >
                Add new Mission
              </button>

              <h2 className="text-lg md:text-xl font-bold">Rules:</h2>
              <ul>
                {ruleObjects.map((rule, index) => (
                  <li key={index}>{rule.title}</li>
                ))}
              </ul>
              <button
                type="button"
                onClick={openRuleModal}
                className="bg-green-500 text-white py-2 px-4 rounded ml-4"
              >
                Add new Rule
              </button>
            </div>
            <div className="w-full mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      <MissionContainer
        children={
          <div className="flex flex-row">
            <div className="w-2/3">
              <Map creating={missionObjects.length > 0} />
            </div>
            <div className="w-1/3">
              <MissionInput
                gameId={gameId}
                onAddMission={handleAddMission}
                onAddLocation={handleAddMarker}
                closeModal={closeModal}
                showModal={isRuleModalOpen}
              />
            </div>
          </div>
        }
        showModal={isMissionModalOpen}
        closeModal={closeModal}
      />
      <RuleContainer
        children={
          <div>
            <RuleInput
              gameId={gameId}
              onAddRule={handleAddRule}
              closeModal={closeModal}
              showModal={isRuleModalOpen}
            />
          </div>
        }
        showModal={isRuleModalOpen}
        closeModal={closeModal}
      />
       {showSuccessMessage && (
        <div className="text-center text-green-500 mt-4">
          Game created successfully! Clearing the page in 3 seconds...
        </div>
      )}
    </div>
  );
};

export default CreateGameContainer;

{
  /* <div className="container mx-auto p-6 bg-black bg-opacity-60 rounded-lg text-white" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}> */
}
