//squadService.js
import { fetchSquads, createSquad, getSquadById, getPlayerById } from "./api";

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

export const getSquadDetailsById = async (squadId) => {
    try {
      const squadDetails = await getSquadById(squadId);
      
      const squadMembers = await Promise.all(
        squadDetails.playerIds.map(async (playerId) => {
          const playerDetails = await getPlayerById(playerId);
          return {
            username: playerDetails.username,
            zombie: playerDetails.zombie,
          };
        })
      );
      
      squadDetails.playerIds = squadMembers;
  
      return squadDetails;
    } catch (error) {
      throw error;
    }
  };

export default {
    getSquads,
    createNewSquad,
    getSquadDetailsById
}; 
