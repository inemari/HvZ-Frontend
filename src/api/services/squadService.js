import createCrudService from "../ICrudService";
import api from "../axios";

//  service for managing squad data.
const squadService = createCrudService("Squad");


// Add a game ID to a squad using an API call.
export const addGameIdToSquad = async (squadId, gameId) => {
    try {
      console.log(squadId, gameId);  // Log squadId and gameId for reference.
    const response = await api.put(
      `/squad/${squadId}/add-game/${gameId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
       // Log an error message and details if there is a response error.
      console.error("Failed to add GameId to Squad:", error.response.data);
    }
    throw error;
  }
};


// Fetch squads associated with a specific game ID using an API call.
export const fetchSquadsByGameId = async (gameId) => {
  try {
    const response = await api.get(`/squad/filterbygameid/${gameId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log an error message and details if there is a response error.
      console.error("Failed to get squads by GameId:", error.response.data);
    }
    throw error;
  }
};

// Add a player to a squad using an API call.
export const joinSquad = async (id, playerId) => {
  try {
    const response = await api.put(`/Squad/${id}/add-player/${playerId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to add player to squad:", error.response.data);
    }
    throw error;
  }
}

// Remove a player from a squad using an API call.
export const leaveSquad = async (id, playerId) => {
  try {
    const response = await api.put(`/Squad/${id}/remove-player/${playerId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to remove player from squad:", error.response.data);
    }
    throw error;
  }
}

// Function to fetch player details for an array of player IDs
const fetchPlayerDetails = async (playerIds) => {
  try {
    const playerDetailsPromises = playerIds.map(async (playerId) => {
      const response = await api.get(`/player/${playerId}`);
      const playerDetails = response.data;
      return {
        playerId,
        username: playerDetails.username,
        zombie: playerDetails.zombie,
      };
    });

    return Promise.all(playerDetailsPromises);
  } catch (error) {
    if (error.response) {
      // Log an error message and details if there is a response error.
      console.error("Failed to get player details:", error.response.data);
    }
    throw error;
  }
};

// Get squad details by squad ID, including player details.
export const getSquadDetailsById = async (squadId) => {
  try {
      const squadDetails = await squadService.getById(squadId);

      // Fetch all player details for the squad's player IDs
      const squadMembers = await fetchPlayerDetails(squadDetails.playerIds);

      // Include playerIds in squadDetails
      squadDetails.playerIds = squadMembers;

      return squadDetails;
    } catch (error) {
      if (error.response) {
        // Log an error message and details if there is a response error.
        console.error("Failed to get squad information:", error.response.data);
      }
      throw error;
    }
};

export default squadService;