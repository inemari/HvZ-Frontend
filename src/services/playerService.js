import api from "./api";

// Function to fetch a player by playerId
export const getPlayer = async (playerId) => {
  try {
    // Send a GET request to retrieve player data by playerId
    const response = await api.get(`/Players/${playerId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log an error message if the API responds with an error
      console.error("Failed to get Player:", error.response.data);
    }
    // Throw the error to indicate the failure to fetch player data
    throw error;
  }
};

// Function to fetch a player by bitecode
export const getPlayerByBiteCode = async (bitecode) => {
  try {
    // Send a GET request to retrieve a player by bitecode
    const response = await api.get(`/players/by-bitecode/${bitecode}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log an error message if the API responds with an error
      console.error("Failed to get Player:", error.response.data);
    }
    // Throw the error to indicate the failure to fetch player data
    throw error;
  }
};

// Function to set a player's status to zombie
export const setZombieToTrue = async (bitecode, gameId) => {
  try {
    // Fetch the player by bitecode
    const player = await getPlayerByBiteCode(bitecode);

    // Check if the player exists and belongs to the specified game
    if (player.gameId === gameId) {
      // Send a PUT request to update the player's status to zombie
      const response = await api.put(`/players/by-bitecode/${bitecode}`);
      console.log("Turned into zombie", bitecode);
      return response.data; // If successful, return the response data
    } else {
      // Handle the case where the player doesn't exist or doesn't belong to the game
      return "Player is not in the specified game."; // Return an error message
    }
  } catch (error) {
    // Handle other errors, and return an error message
    return "No player has the provided bitecode.";
  }
};
