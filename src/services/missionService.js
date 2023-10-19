//missionservice
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const postMission = async (missionData) => {
    try {
      const response = await api.post("/mission", missionData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Failed to post Mission:", error.response.data);
      }
      throw error;
    }
};
  
export const addCoordinateToMission = async (missionId, locationId) => {
    try {
        const response = await api.put(`/mission/${missionId}/add-location/${locationId}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("'Failed to add location to mission'", error.response.data);
          }
        throw new Error('Failed to add coordinate to mission');
    }
};
