import React, { useEffect, useState } from "react";
import {
  getSquadDetailsById,
  joinSquad,
  leaveSquad,
} from "../../services/squadService";
import ModalContainer from "../common/ModalContainer";
import { updatePlayerLocation } from "../../services/locationService";
import InputField from "../common/InputField";
import Container from "../common/Container";
import CustomButton from "../common/CustomButton";
import ChatComponent from "../../components/chat/Chat";
import * as signalR from "@microsoft/signalr";

const SquadInformation = ({
  squadId,
  locationHubConnection,
  hubConnection,
}) => {
  const [squadDetails, setSquadDetails] = useState(null);
  const [isMember, setIsMember] = useState(false); // A flag to track squad membership
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [xCoordinate, setXCoordinate] = useState("");
  const [yCoordinate, setYCoordinate] = useState("");
  const [receivedLocations, setReceivedLocations] = useState([]);

  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const playerId = parseInt(sessionStorage.getItem("playerId"), 10);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Define fetchSquadDetails here
  const fetchSquadDetails = async () => {
    try {
      const details = await getSquadDetailsById(squadId);
      setSquadDetails(details);

      setIsMember(
        details.playerIds.some((player) => player.playerId === playerId)
      );

      console.log("PlayerID:", playerId);
    } catch (error) {
      console.error("Error fetching squad details:", error);
    }
  };

  useEffect(() => {
    // Fetch squad details when the component mounts
    fetchSquadDetails();
  }, [squadId]);

  // Function to join or leave the squad
  const handleJoinOrLeaveSquad = async () => {
    try {
      if (isMember) {
        // Leave the squad
        await leaveSquad(squadId, playerId);
      } else {
        // Join the squad
        await joinSquad(squadId, playerId);
      }

      // Refetch squad details to update the information
      await fetchSquadDetails();
    } catch (error) {
      console.error("Error joining or leaving the squad:", error);
    }
  };

  const handleLeaveMarker = async (event) => {
    event.preventDefault();
    try {
      // Call the updateLocation function to update the player's location
      await updatePlayerLocation(playerId, xCoordinate, yCoordinate);
      toggleModal();
    } catch (error) {
      console.error("Error leaving a marker:", error);
    }
    if (
      locationHubConnection &&
      locationHubConnection.state === signalR.HubConnectionState.Connected
    ) {
      locationHubConnection
        .invoke(
          "SendLocationUpdate",
          parseInt(playerId),
          parseInt(xCoordinate),
          parseInt(yCoordinate)
        )
        .catch((error) => {
          console.error("Error sending message: " + error);
        });
    }
  };

  return (
    <Container>
      {squadDetails ? (
        <>
          <h2>Squad Information</h2>
          <p>Squad Name: {squadDetails.squadName}</p>
          <p>Total Members: {squadDetails.numberOfMembers}</p>
          <p>Deceased Members: {squadDetails.numberOfDeceased}</p>
          <h3>Squad Members:</h3>
          <ul>
            {squadDetails.playerIds.map((member) => (
              <li key={member.username}>
                <p>Username: {member.username}</p>
                <p>State: {member.zombie ? "Zombie" : "Human"}</p>
              </li>
            ))}
          </ul>
          <CustomButton
            onClick={handleJoinOrLeaveSquad}
            label={isMember ? "Leave Squad" : "Join Squad"}
          />

          {isMember && (
            <CustomButton
              onClick={toggleModal}
              label={"Leave Marker"}
            ></CustomButton>
          )}

          {isModalVisible && (
            <ModalContainer showModal={isModalVisible} closeModal={toggleModal}>
              <h2>Share your Location with your squad!</h2>
              <form onSubmit={handleLeaveMarker}>
                <div>
                  <label>X Coordinate:</label>
                  <InputField
                    label="X Coordinate"
                    placeholder="Enter X Coordinate"
                    value={xCoordinate}
                    onChange={(value) => setXCoordinate(value)}
                    showIcon={false}
                  />
                </div>
                <div>
                  <label>Y Coordinate:</label>
                  <InputField
                    label="Y Coordinate"
                    value={yCoordinate}
                    onChange={(value) => setYCoordinate(value)}
                    placeholder="Enter Y Coordinate"
                    showIcon={false}
                  />
                </div>
                <div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </ModalContainer>
          )}
        </>
      ) : (
        <p>Loading squad information...</p>
      )}
    </Container>
  );
};

export default SquadInformation;
