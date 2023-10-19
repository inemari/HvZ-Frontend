import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const postLocation = async (locationData) => {
    try {
      const response = await api.post("/Location", locationData);
      return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Failed to post Location:", error.response.data);
          }
          throw error;
    }
};

export const postGame = async (gameData) => {
    try {
      const response = await api.post("/Game", gameData);
      return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Failed to post Game:", error.response.data);
          }
          throw error;
    }
};