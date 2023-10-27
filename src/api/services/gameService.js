import createCrudService from "../ICrudService";
import api from "../axios";

const gameService = createCrudService("Game");


// removes duplicates from an array of objects based on a specified property.
function removeDuplicates(arr, prop) {
    const unique = new Set();
    return arr.filter((item) => {
      const value = item[prop];
      if (unique.has(value)) {
        return false; // Duplicate, exclude it
      }
      unique.add(value);
      return true; // Not a duplicate, include it
    });
}
  // Fetch games by state using an asynchronous API call.
export const fetchGamesByState = async (gameState) => {
  try {
    const response = await api.get(`/game/filterbystates/${gameState}`);
    return response.data;  // Return the data received from the API
  } catch (error) {
    throw error;
  }
};

// Fetch game status values and remove duplicates based on the 'gameState' property.
export const getGamesByState = async (gameState) => {
  try {
    const gamesData = await fetchGamesByState(gameState);
    return gamesData;
  } catch (error) {
    throw error;
  }
};

export const getGameStatusValues = async () => {
    try {
      const gamesData = await gameService.getAll();
      // Extract game status values (both gameStateString and gameState) from the response
      const gameStatusValues = gamesData.map((game) => ({
        gameStateString: game.gameStateString,
        gameState: game.gameState,
      }));
      // Remove duplicate values and return them
      const uniqueGameStatusValues = removeDuplicates(
        gameStatusValues,
        "gameState"
      );
      return uniqueGameStatusValues;
    } catch (error) {
      throw error;
    }
};
  
// Add a mission to a game using an API call.
export const addMissionToGame = async (gameId, missionId) => {
    try {
      const response = await api.put(`/game/${gameId}/add-mission/${missionId}`);
      return response.data; // Return the response data.
    } catch (error) {
      if (error.response) {
        console.error("Failed to add mission to Game:", error.response.data);
      }
      throw error;
    }
  };
  
  // Add a rule to a game using an API call.
  export const addRuleToGame = async (gameId, ruleId) => {
    try {
      const response = await api.put(`/game/${gameId}/add-rule/${ruleId}`);
      return response.data; // Return the response data.
    } catch (error) {
      if (error.response) {
          console.error("Failed to add rule to Game:", error.response.data);
        }
        throw error;
      }
  };
  
export default gameService;