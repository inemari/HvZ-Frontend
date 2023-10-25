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

export default squadService;