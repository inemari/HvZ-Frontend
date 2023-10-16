import React, { useState } from "react";
import AddTitle from "./AddTitle";
import AddMapModal from "./AddMapModal";
import AddDescription from "./AddDescription";
import MissionInput from "../../missions/MissionInput";
import { postGame } from "../../../services/gameService";
import MissionContainer from "../../common/ModalContainer";
import RuleContainer from "../../common/ModalContainer";
import Map from "../../map/Map";
import AddMarker from "../../map/markers/AddMarker";
import RuleInput from "../../rule/ruleInput";

const CreateGameContainer = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pictureURL: "",
  });

  const [missionObjects, setMissionObjects] = useState([]); // Store entire mission objects
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

  // Callback function to add the mission to missionObjects
  const handleAddMission = (missionData) => {
    setMissionObjects((prevMissions) => [
      ...prevMissions,
      {
        id: missionData.id,
        name: missionData.name,
      },
    ]);
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

    if (gameResponse && gameResponse.id) {
      const gameId = gameResponse.id;

      setGameCreated(true);
      setGameId(gameId);

      // Update the title and description placeholders
      setFormData({
        title: title,
        description: description,
        pictureURL: "",
      });

      setMissionObjects([]);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-black bg-opacity-60 rounded-lg text-white">
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
              placeholder={gameCreated ? formData.title : "error"}
            />
            <AddDescription
              formData={formData}
              handleInputChange={handleInputChange}
              placeholder={gameCreated ? formData.description : "error"}
            />
            <div className="w-full mt-4">
              {gameCreated ? (
                <p>Game with id: {gameId} was successfully created</p>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              )}
            </div>
            {gameCreated && (
              <div>
                <h2 className="text-lg md:text-xl font-bold">Missions:</h2>
                <ul>
                  {missionObjects.map((mission, index) => (
                    <li key={index}>
                      {mission.name}
                      {/*                       <button
                        type="button"
                        onClick={openMapModal}
                        className="bg-blue-500 text-white py-2 px-4 rounded ml-4"
                      >
                        Add Mission Marker
                      </button> */}
                    </li>
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
                    <li key={index}>
                      {rule.title}
                    </li>
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
            )}
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
    </div>
  );
};

export default CreateGameContainer;


{
  /* <div className="container mx-auto p-6 bg-black bg-opacity-60 rounded-lg text-white" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)' }}> */
}
