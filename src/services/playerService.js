/* import api from "./api";

export const getPlayer = async (playerId) => {
  try {
    const response = await api.get(`/Players/${playerId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to get Player:", error.response.data);
    }
    throw error;
  }
};

export const getPlayerByBiteCode = async (bitecode) => {
  try {
    const response = await api.get(`/players/by-bitecode/${bitecode}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to get Player:", error.response.data);
    }
    throw error;
  }
};

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
}; */
