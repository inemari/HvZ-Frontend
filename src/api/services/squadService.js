import createCrudService from "../ICrudService";
import api from "../axios";

const squadService = createCrudService("Squad");

export const addGameIdToSquad = async (squadId, gameId) => {
    try {
      console.log(squadId, gameId);
    const response = await api.put(
      `/squad/${squadId}/add-game/${gameId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("'Failed to add game Id to squad'", error.response.data);
    }
    throw new Error("Failed to add game Id to squad");
  }
};

export const getSquads = async () => {
  try {
    const response = await api.get('/Squad');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const fetchSquadsByGameId = async (gameId) => {
  try {
    const response = await api.get(`/squad/filterbygameid/${gameId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNewSquad = async (squadName) => {
  try {
    const response = await api.post('/Squad', { SquadName: squadName });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const joinSquad = async (id, playerId) => {
  try {
    const response = await api.put(`/Squad/${id}/add-player/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding player to squad:', error);
    throw error;
  }
}

export const leaveSquad = async (id, playerId) => {
  try {
    const response = await api.put(`/Squad/${id}/remove-player/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing player from squad:', error);
    throw error;
  }
}

export const getSquadById = async (squadId) => {
  try {
    const response = await api.get(`/Squad/${squadId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch player information
export async function fetchPlayerInfo(playerId) {
  try {
    const response = await api.get(`/player/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player info', error);
    throw error;
  }
}

export const getSquadDetailsById = async (squadId) => {
  try {
      const squadDetails = await getSquadById(squadId);

      // Fetch all player details for the squad's player IDs
      const squadMembers = await fetchPlayerDetails(squadDetails.playerIds);

      // Include playerIds in squadDetails
      squadDetails.playerIds = squadMembers;

      return squadDetails;
  } catch (error) {
      console.error('Error fetching squad details:', error);
      throw error;
  }
};
// Function to fetch player details for an array of player IDs
export const fetchPlayerDetails = async (playerIds) => {
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
    throw error;
  }
};

export default squadService;