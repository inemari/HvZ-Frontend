import { fetchSquads, createSquad, getSquadById, getPlayerById, addPlayerToSquad, removePlayerFromSquad } from "./api";
import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Function to fetch all squads
export const getSquads = async () => {
    try {
        const squadsData = await fetchSquads();
        return squadsData;
    } catch (error) {
        throw error;
    }
}


// Function to fetch squads by a specific game ID
export const fetchSquadsByGameId = async (gameId) => {
    try {
      const response = await api.get(`/squad/filterbygameid/${gameId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

// Function to add a game ID to a squad
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

// Function to create a new squad
export const createNewSquad = async (squadName) => {
    try {
        const newSquad = await createSquad(squadName);
        return newSquad;
    } catch (error) {
        throw error;
    }
}

// Function to join a squad
export const joinSquad = async (squadId, playerId) => {
    try {
        const squad = await addPlayerToSquad(squadId, playerId);
        sessionStorage.setItem("joinedSquadId", squadId); // Store the selected squad's ID
        return squad;
    } catch (error) {
        throw error;
    }
}

// Function to leave a squad
export const leaveSquad = async (id, playerId) => {
    try {
        const squad = await removePlayerFromSquad(id, playerId);
        sessionStorage.setItem("joinedSquadId", ""); // Store the selected squad's ID
        return squad;
    } catch (error) {
        throw error;
    }
}

// Function to get squad details by squad ID
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
const fetchPlayerDetails = async (playerIds) => {
    const playerDetailsPromises = playerIds.map(async (playerId) => {
        const playerDetails = await getPlayerById(playerId);
        return {
            playerId,
            username: playerDetails.username,
            zombie: playerDetails.zombie,
        };
    });

    return Promise.all(playerDetailsPromises);
};

// Export the functions and methods from this service
export default {
    getSquads,
    createNewSquad,
    getSquadDetailsById,
    joinSquad,
    leaveSquad,
}; 