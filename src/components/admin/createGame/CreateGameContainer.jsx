import React, { useEffect, useState } from "react";
import AddTitle from "./AddTitle";
import AddMapModal from "./AddMapModal";
import AddDescription from "./AddDescription";
import MissionInput from "../../missions/MissionInput";
import MissionContainer from "../../common/ModalContainer";
import RuleContainer from "../../common/ModalContainer";
import Map from "../../map/Map";
import RuleInput from "../../rule/ruleInput";
import { createGame } from "../../../services/adminService"; // Import the createGame function
import Container from '../../common/Container'
import CustomButton from '../../common/CustomButton'
const CreateGameContainer = () => {
  const gameEntity = {
    title: "",
    description: "",
    pictureURL: "",
  };

  const [gameFormData, setGameFormData] = useState(gameEntity);
  const [missionObjects, setMissionObjects] = useState([]);
  const [locationObjects, setLocationObjects] = useState([]);
  const [ruleObjects, setRuleObjects] = useState([]);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [gameCreated, setGameCreated] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const openMissionModal = () => {
    setIsMissionModalOpen(true);
  };

  const openRuleModal = () => {
    setIsRuleModalOpen(true);
  };

  const closeModal = () => {
    setIsMissionModalOpen(false);
    setIsRuleModalOpen(false);
  };

  const handleAddMission = (missionData, locationData) => {
    setMissionObjects((prevMissions) => [...prevMissions, missionData]);
    setLocationObjects((prevLocations) => [...prevLocations, locationData]);
  };

  const handleAddRule = (ruleData) => {
    setRuleObjects((prevRules) => [...prevRules, ruleData]);
  };

  const handleAddMarker = (locationData) => {
    setLocationObjects((prevLocations) => [...prevLocations, locationData]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameFormData((prevGameData) => ({
      ...prevGameData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the game and get the game ID
    const gameId = await createGame(
      gameFormData,
      missionObjects,
      ruleObjects,
      locationObjects
    );

    if (gameId) {
      setGameCreated(true);
      setGameId(gameId);

      // Show the success message
      setShowSuccessMessage(true);

      // Update the placeholders and reset the form
      setGameFormData(gameEntity);
      setMissionObjects([]);
      setRuleObjects([]);
      setLocationObjects([]);

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!showSuccessMessage) {
      // Clear the page or perform other actions here
    }
  }, [showSuccessMessage]);

  return (
    <Container>
      <form onSubmit={handleSubmit} className="mx-auto">

        <AddDescription
          gameFormData={gameFormData}
          handleInputChange={handleInputChange}
          placeholder={gameCreated}
        />
        <AddMapModal
          formData={gameFormData}
          handleInputChange={handleInputChange} />
        <div className="w-full">
          <h2 className="text-lg md:text-xl font-bold">Missions:</h2>
          <div className="grid grid-flow-row row-auto">
            {missionObjects.map((mission, index) => (
              <div className="block rounded-lg p-6 shadow-sm bg-neutral-700 my-3 w-max">
                <h5
                  class="mb-2 text-xl font-medium leading-tight text-neutral-50 " key={index}>{mission.name}
                </h5>
                <li key={index}>{mission.description}</li></div>
            ))}</div>

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
        <div className="absolute bottom-0 right-0 w-full m-5">
          <div dir="rtl" className="static mb-0 p-5 w-full">
            <CustomButton label="Join Game" className="start-0 mb-0 static text-lg" />
          </div>
        </div>
        <CustomButton label={"Submit"} type={"ubmit"} className="w-full" />

      </form >

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
      {
        showSuccessMessage && (
          <div className="text-center text-green-500 mt-4">
            Game created successfully! Clearing the page in 3 seconds...
          </div>
        )
      }
    </Container>
  );
};

export default CreateGameContainer;
