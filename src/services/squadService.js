//Squadservice.js: 
import { fetchSquads, createSquad, getSquadById, getPlayerById, addPlayerToSquad, removePlayerFromSquad } from "./api";

export const getSquads = async () => {
    try {
        const squadsData = await fetchSquads();
        return squadsData;
    } catch (error) {
        throw error;
    }
}

export const createNewSquad = async (squadName) => {
    try {
        const newSquad = await createSquad(squadName);
        return newSquad;
    } catch (error) {
        throw error;
    }
}

export const joinSquad = async (id, playerId) => {
    try {
        const squad = await addPlayerToSquad(id, playerId);
        return squad;
    } catch (error) {
        throw error;
    }
}

export const leaveSquad = async (id, playerId) => {
    try {
        const squad = await removePlayerFromSquad(id, playerId);
        return squad;
    } catch (error) {
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

export default {
    getSquads,
    createNewSquad,
    getSquadDetailsById,
    joinSquad,
    leaveSquad,
}; 