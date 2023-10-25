import createCrudService from "../ICrudService";
import api from "../axios";

const playerService = createCrudService("player");

export const getPlayerByBiteCode = async (bitecode) => {
    try {
      const response = await api.get(`/player/by-bitecode/${bitecode}`);
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
        const response = await api.put(`/player/by-bitecode/${bitecode}`);
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

export const saveUsername = async (username, gameId) => {
  try {
      const data = {
          username,
          zombie: true,
          biteCode: 'string',
          userId: 0,
          locationId: 0,
          squadId: 0,
          gameId,
      };

      const response = await api.post(`/Player`, data);

      if (response.status === 200) {
          return response.data;
      } else {
          throw new Error('Failed to save username');
      }
  } catch (error) {
      throw new Error(`Error: ${error.message}`);
  }
};  

export const updatePlayerLocation = async (id, x, y) => {
  try {
    const response = await api.put(`/player/leaveMarker/${id}`, {
      XCoordinate: x,
      YCoordinate: y,
    });
    return response.data;
  } catch (error) {
    console.error("Error leaving marker:", error);
    throw error;
  }
};
  
export default playerService;