import React, { useEffect, useState } from "react";
import AddNew from "./AddNew";
import AddMapModal from "./AddMapModal";
import MissionInput from "../../missions/MissionInput";
import MissionContainer from "../../common/ModalContainer";
import RuleContainer from "../../common/ModalContainer";
import Map from "../../map/Map";
import RuleInput from "../../rule/ruleInput";
import { createGame, editGame } from "../../../services/adminService";
import CustomButton from "../../common/CustomButton";
import noImage from "../../../assets/ui/noImage.png";
import GameInfoInput from "./GameInfoInput";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessMessage from "../../common/feedback/successMessage";
import { fetchGameRulesByIds } from "../../../api/services/ruleService";
import { getGameMissions } from "../../../api/services/missionService";

// GameEditor component is used for creating or editing a game.
const GameEditor = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const editMode = location === "/EditGame";
  const [missionObjects, setMissionObjects] = useState([]);
  const [locationObjects, setLocationObjects] = useState([]);
  const [ruleObjects, setRuleObjects] = useState([]);
  const [isMissionModalOpen, setIsMissionModalOpen] = useState(false);
  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [gameCreated, setGameCreated] = useState(false);
  const [gameId, setGameId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [pictureURL, setPictureURL] = useState(noImage); // State to store the image URL

  // useEffect to initialize data when in edit mode
  useEffect(() => {
    if (editMode) {
      // In edit mode, load existing rules and missions from the selectedGame
      setGameFormData({
        title: selectedGame.title,
        description: selectedGame.description,
        pictureURL: selectedGame.pictureURL || noImage,
        mapURL: selectedGame.mapURL || "",
      });

      // Define a function to load existing rules and missions
      const loadRulesAndMissions = async () => {
        const rules = await fetchGameRulesByIds(selectedGame.ruleIds);
        const missions = await getGameMissions(selectedGame.missionIds);
        // Update state with the loaded rules and missions
        setRuleObjects(rules);
        setMissionObjects(missions);
      };

      // Call the function to load rules and missions
      loadRulesAndMissions();
    }
  }, []);

  const gameEntity = {
    title: editMode ? selectedGame.title : "",
    description: editMode ? selectedGame.description : "",
    pictureURL: editMode ? selectedGame.pictureURL : "",
    mapURL: editMode ? selectedGame.mapURL : "",
  };
  const [gameFormData, setGameFormData] = useState(gameEntity);
  const handleImageUrlChange = (e) => {
    // Update the imageUrl state when the input value changes
    setPictureURL(e.target.value);
    handleInputChange(e);
  };
  // Open the mission modal
  const openMissionModal = () => {
    setIsMissionModalOpen(true);
  };
  // Open the rule modal
  const openRuleModal = () => {
    setIsRuleModalOpen(true);
  };
  // Close the mission and rule modals
  const closeModal = () => {
    setIsMissionModalOpen(false);
    setIsRuleModalOpen(false);
  };
  // Add a new mission and location
  const handleAddMission = (missionData, locationData) => {
    setMissionObjects((prevMissions) => [...prevMissions, missionData]);
    setLocationObjects((prevLocations) => [...prevLocations, locationData]);
  };
  // Add a new rule
  const handleAddRule = (ruleData) => {
    setRuleObjects((prevRules) => [...prevRules, ruleData]);
  };
  // Add a new marker location
  const handleAddMarker = (locationData) => {
    setLocationObjects((prevLocations) => [...prevLocations, locationData]);
  };
  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGameFormData((prevGameData) => ({
      ...prevGameData,
      [name]: value,
    }));
  };
  // Handle the form submission for creating a new game
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
        navigate("/LandingPage");
      }, 3000);
    }
  };

  // Handle the form submission for editing an existing game
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Create the game and get the game ID
    const gameId = await editGame(
      gameFormData,
      missionObjects,
      ruleObjects,
      locationObjects,
      parseInt(selectedGame.id)
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
        navigate("/LandingPage");
      }, 3000);
    }
  };

  return (
    <>
      {" "}
      {/* Display a success message after creating or editing an game */}
      {showSuccessMessage && (
        <SuccessMessage
          header="Game created successfully! "
          message="You will be redirected to the landingPage"
        />
      )}
      <form className="justify-center flex-wrap w-full flex ">
        <div className="lg:grid md:grid-cols-7 pt-3  gap-3 w-full relative ">
          <img
            src={pictureURL || noImage}
            id="imgURL"
            alt="Game"
            className="aspect-square col-span-2 justify-center p-3"
          />
          <div className="grid lg:col-span-5 lg:gap-3">
            {/* Title and description section */}
            <GameInfoInput
              handleImageUrlChange={handleImageUrlChange}
              gameFormData={gameFormData}
              handleInputChange={handleInputChange}
              placeholder={gameCreated}
            />

            {/* Rule and mission section */}
            <div className="grid md:grid-cols-2 gap-3">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold pb-2">RULES</h2>
                {ruleObjects.map((rule, index) => (
                  <div key={index}>
                    <ul className="bg-white bg-opacity-25 justify-center flex-col flex p-3 rounded-lg gap-3 hover:bg-opacity-40 my-3">
                      <p>
                        <b>{rule.title}</b>
                      </p>
                      <li>{rule.description}</li>
                    </ul>
                  </div>
                ))}
                <AddNew action={openRuleModal} label="Add Rule" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-bold pb-2">MISSIONS</h2>
                {missionObjects.map((mission, index) => (
                  <div key={index}>
                    <ul className="bg-white bg-opacity-25 justify-center flex-col flex p-3 rounded-lg gap-3 hover:bg-opacity-40 my-3">
                      <p>
                        <b>{mission.name}</b>
                      </p>
                      <li>{mission.description}</li>
                    </ul>
                  </div>
                ))}
                <AddNew action={openMissionModal} label="Add Mission" />
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-lg md:text-3xl w-full font-semibold text-center py-5">
          Choose map
        </h2>
        <div className="grid grid-flow-col w-full">
          <AddMapModal
            formData={gameFormData}
            handleInputChange={handleInputChange}
          />
        </div>
        <div className="z-20 bottom-24 right-12 absolute ">
          <CustomButton
            label={"Submit"}
            type={"submit"}
            id={"submit-button"}
            className=" w-full static text-3xl "
            rounded={"3xl"}
            onClick={editMode ? handleEditSubmit : handleSubmit}
          />
        </div>

        {/* add Mission modal */}
        <MissionContainer
          children={
            <>
              <div className="grid lg:grid-cols-3 grid-cols-1 items-center gap-2">
                <MissionInput
                  gameId={gameId}
                  onAddMission={handleAddMission}
                  onAddLocation={handleAddMarker}
                  closeModal={closeModal}
                  showModal={isMissionModalOpen}
                />
                <div className="grid col-span-full lg:col-span-2 h-full items-center lg:p-5">
                  <Map creating={missionObjects.length > 0} />
                </div>
              </div>
            </>
          }
          showModal={isMissionModalOpen}
          handleCloseModal={closeModal}
        />
        {/* add rule modal */}
        <RuleContainer
          children={
            <RuleInput
              gameId={gameId}
              onAddRule={handleAddRule}
              closeModal={closeModal}
              showModal={isRuleModalOpen}
            />
          }
          showModal={isRuleModalOpen}
          handleCloseModal={closeModal}
        />
      </form>
    </>
  );
};
export default GameEditor;
