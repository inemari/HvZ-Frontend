import React, { useState } from "react";
import CustomButton from "../common/CustomButton";
import { useNavigate } from "react-router-dom";
import InputField from "../common/InputField"; // Import the InputField component
import { checkIfExists } from "../../api/services/userService";
import playerService from "../../api/services/playerService";

// UserNameModal is a component that allows the user to choose a username for the game.
// Props:
// - onClose: A callback function to close the modal.
const UserNameModal = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Function to handle the form submission when the "Join" button is clicked.
  const handleSubmit = async () => {
    if (userName.trim() === "") {
      setError("Username is required.");
    } else {
      try {
        const selectedGame = JSON.parse(localStorage.getItem("selectedGame")); // Retrieve the selected game
        if (!selectedGame) {
          setError("Selected game is missing.");
          return;
        }
        await checkIfExists();

        const playerResponse = await playerService.add({
          username: userName,
          gameId: selectedGame.id,
        });

        // Save the userinfo in sessionStorage
        sessionStorage.setItem("username", userName);
        sessionStorage.setItem("playerId", playerResponse.id);
        sessionStorage.setItem("joinedGame", selectedGame.id);

        // Close the modal and navigate to map
        onClose();
        navigate("/MapPage");

      } catch (error) {
        setError("Failed to save username");
      }
    }
  };

  return (
    <div className="grid grid-flow-row gap-3 text-center">
      <h2 className="text-xl font-medium mb-4 text-white">
        Choose a username:
      </h2>
      <InputField
        error={error}
        value={userName}
        onChange={(value) => setUserName(value)}
        showIcon={true}
        iconPath="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
        placeholder="Username"
      />
      {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
      <CustomButton type="submit" label={"Join"} onClick={handleSubmit} />
    </div>
  );
};

export default UserNameModal;
