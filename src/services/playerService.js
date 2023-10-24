import api from "./api";

export const getPlayer = async (playerId) => {
  try {
    const response = await api.get(`/Players/${playerId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to get Player:", error.response.data);
    }
    throw error;
  }
};