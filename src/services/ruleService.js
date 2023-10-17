import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const postRule = async (ruleData) => {
    try {
      const response = await api.post("/rules", ruleData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Log the response data for debugging
        console.error("Failed to post Rule:", error.response.data);
      }
      throw error;
    }
};