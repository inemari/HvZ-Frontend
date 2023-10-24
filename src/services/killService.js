import api from "./api";
import { getPlayer } from "./playerService";

export const getKills = async () => {
  try {
    const response = await api.get(`/Kill/GetKills`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch kill locations");
  }
};

export async function getKill(id) {
  try {
    const response = await api.get(`/kill/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Handle specific API error message here
      console.error("API Error:", error.response.data);
    } else {
      // Handle other errors
      console.error("Error getting kill", error);
    }
    throw error;
  }
}

export const postKill = async (killData) => {
  try {
    const response = await api.post("/kill", killData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to post Kill:", error.response.data);
    }
    throw error;
  }
};

export const getKillsInGame = async (gameId) => {
  try {
    // Fetch kill locations using the getKillLocations function
    const killData = await getKills();

    // Create an array to store the combined kill and player data
    const killIds = [];
    console.log("KillData", killData);
    // Fetch details for each kill location and player
    await Promise.all(
      killData.map(async (kill) => {
        // Fetch the player details for the current kill
        const player = await getPlayer(kill.playerId);
        // Check if the player is in the desired game
        if (player.gameId === gameId) {
          // Add the killId to the killIds array
          killIds.push(kill);
        }
      })
    );
    console.log("KillIds", killIds);
    return killIds;
  } catch (error) {
    // Handle errors or return an error message as needed
    console.error("Error in getKillsInGame:", error);
    throw error;
  }
};
