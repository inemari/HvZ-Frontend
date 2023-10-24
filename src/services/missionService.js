import axios from "axios";

// Create an Axios instance with the base URL from environment variables
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Function to post a new mission
export const postMission = async (missionData) => {
  try {
    // Send a POST request to create a new mission with provided data
    const response = await api.post("/mission", missionData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log an error message if the API responds with an error
      console.error("Failed to post Mission:", error.response.data);
    }
    throw error;
  }
};

// Function to add a location to an existing mission
export const addLocationToMission = async (missionId, locationId) => {
  try {
    const response = await api.put(
      `/mission/${missionId}/add-location/${locationId}`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log an error message if the API responds with an error
      console.error("'Failed to add location to mission'", error.response.data);
    }
    // Throw a new error to indicate the failure to add a location to a mission
    throw new Error("Failed to add location to mission");
  }
};
