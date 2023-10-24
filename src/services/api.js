import axios from 'axios';
import keycloak from '../Keycloak';

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Intercept requests to add an Authorization header with the Keycloak token
api.interceptors.request.use((config) => {
  const token = keycloak.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Function to fetch player information by playerId
export async function fetchPlayerInfo(playerId) {
  try {
    const response = await api.get(`/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player info', error);
    throw error;
  }
}

// Function to modify player information by playerId
export async function modifyPlayer(playerId, playerData) {
  try {
    const response = await api.put(`/players/${playerId}`, playerData);
    return response.data;
  } catch (error) {
    console.error('Error updating player info', error);
    throw error;
  }
}

// Function to change the zombie state of a player
export async function changeZombieStateOfPlayer(playerId, updatedData) {
  try {
    // Send a PUT request to update the player's status to zombie
    const response = await api.put(`/players/${playerId}/update-zombiestate?zombie=${updatedData.zombie}&biteCode=${updatedData.biteCode}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log the response data for debugging
      console.error("Failed to post Rule:", error.response.data);
    }
    throw error;
  }
}

// Function to fetch games
export async function fetchGames() {
  try {
    const response = await api.get('/game');
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to fetch games by game state
export const fetchGamesByState = async (gameState) => {
  try {
    const response = await api.get(`/game/filterbystates/${gameState}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create a new player
export const createPlayer = async (userName, gameId ) => {
  try {
    const response = await api.post('/players', { username: userName, gameId: gameId});
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to get player information by playerId
export const getPlayerById = async (playerId) => {
  try {
    const response = await api.get(`/players/${playerId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Function to fetch squads
export const fetchSquads = async () => {
  try {
    const response = await api.get('/Squad');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get squad information by squadId
export const getSquadById = async (squadId) => {
  try {
    const response = await api.get(`/Squad/${squadId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to create a new squad
export const createSquad = async (squadName) => {
  try {
    const response = await api.post('/Squad', { SquadName: squadName });
    return response.data;
  } catch (error) {
    throw error;
  }
}

// Function to add a player to a squad
export const addPlayerToSquad = async (id, playerId) => {
  try {
    const response = await api.put(`/Squad/${id}/add-player/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error adding player to squad:', error);
    throw error;
  }
}

// Function to remove a player from a squad
export const removePlayerFromSquad = async (id, playerId) => {
  try {
    const response = await api.put(`/Squad/${id}/remove-player/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing player from squad:', error);
    throw error;
  }
}

// Function to check the existence of a user
export const checkUserExistence = async () => {
  try {
    const response = await api.get('/AppUser/exists');
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // User not found, return null or any appropriate value
      return null;
    }
    // For other errors, you can re-throw the error or handle it as needed.
    throw error;
  }
}

// Function to create a new user
export const createUser = async () => {
  try {
    const response = await api.post('/AppUser/register');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default api;
