import createCrudService from "../ICrudService";
import api from "../axios";
import playerService from "./playerService";

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

const fetchPlayerDetails = async (playerIds) => {
    const playerDetailsPromises = playerIds.map(async (playerId) => {
        const playerDetails = await playerService.getById(playerId);
        return {
            playerId,
            username: playerDetails.username,
            zombie: playerDetails.zombie,
        };
    });

    return Promise.all(playerDetailsPromises);
};

export const getSquadDetailsById = async (squadId) => {
    try {
        const squadDetails = await squadService.getById(squadId);

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
export default squadService;