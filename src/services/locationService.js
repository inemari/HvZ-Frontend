import api from "./api";

// Function to fetch a location by its ID
export const getLocation = async (locationId) => {
  try {
    const response = await api.get(`/Location/${locationId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to get Location:", error.response.data);
    }
    throw error;
  }
};

// Function to post a new location
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

// Function to post a new game
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

// Function to update a player's location by their ID and coordinates
export const updatePlayerLocation = async (id, x, y) => {
  try {
    const response = await api.put(`/players/leaveMarker/${id}`, {
      XCoordinate: x,
      YCoordinate: y,
    });
    return response.data;
  } catch (error) {
    console.error("Error leaving marker:", error);
    throw error;
  }
};
