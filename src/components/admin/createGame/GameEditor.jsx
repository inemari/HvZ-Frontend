import React, { useState } from "react";
import AddNew from "./AddNew";
import AddMapModal from "./AddMapModal";
import MissionInput from "../../missions/MissionInput";
import MissionContainer from "../../common/ModalContainer";
import RuleContainer from "../../common/ModalContainer";
import Map from "../../map/Map";
import RuleInput from "../../rule/ruleInput";
import { createGame } from "../../../services/adminService"; // Import the createGame function
import CustomButton from "../../common/CustomButton";
import noImage from "../../../assets/ui/noImage.png";
import GameInfoInput from "./GameInfoInput";
import InputAdmin from "../../common/CustomInput";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessMessage from "../../common/feedback/successMessage";
import ListObjects from "./ListObjects";
import { useFetchGameRules } from "../../../api/services/ruleService";
import { useFetchGameMissions } from "../../../api/services/missionService";

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
  const [pictureURL, setPictureURL] = useState(
    "https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY"
  ); // State to store the image URL
  const fetchedGameMissions = useFetchGameMissions(selectedGame?.missionIds);
  const fetchedGameRules = useFetchGameRules(selectedGame?.ruleIds || []);
  const gameEntity = {
    title: editMode ? selectedGame.title : "",
    description: editMode ? selectedGame.description : "",
    pictureURL: editMode ? selectedGame.pictureURL : pictureURL,
    mapURL: editMode ? selectedGame.mapURL : "",
    gameRules: editMode ? fetchedGameRules : [],
    gameMissions: editMode ? fetchedGameMissions : [],
  };
  const [gameFormData, setGameFormData] = useState(gameEntity);
  const handleImageUrlChange = (e) => {
    // Update the imageUrl state when the input value changes
    setPictureURL(e.target.value);
  };
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
        navigate("/LandingPage");
      }, 3000);
    }
  };

  return (
    <>
      {" "}
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
              //defaultTitle={gameEntity.title}
              //defaultDescription={gameEntity.description}
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

                <ListObjects list={gameEntity.gameRules} />
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
                <ListObjects list={gameEntity.gameMissions} />
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
            onClick={handleSubmit}
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
