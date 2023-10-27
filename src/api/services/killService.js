import createCrudService from "../ICrudService";
import api from "../axios";
import playerService from "./playerService";

const killService = createCrudService("Kill");

export const getKillsInGame = async (gameId) => {
    try {
      // Fetch kill locations using the getKillLocations function
      const killData = await killService.getAll()
  
      // Create an array to store the combined kill and player data
      const killIds = [];
      console.log("KillData", killData);
      // Fetch details for each kill location and player
      await Promise.all(
        killData.map(async (kill) => {
          // Fetch the player details for the current kill
          const player = await playerService.getById(kill.playerId);
          // Check if the player is in the desired game
          if (player.gameId === gameId) {
            // Add the killId to the killIds array
            killIds.push(kill);
          }
        })
      );
      return killIds;
    } catch (error) {
      // Handle errors or return an error message as needed
      console.error("Error in getKillsInGame:", error);
      throw error;
    }
  };
  
export default killService;