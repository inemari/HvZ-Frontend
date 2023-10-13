import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Function to fetch player information
export async function fetchPlayerInfo(playerId) {
  try {
    const response = await api.get(`/api/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player info', error);
    throw error;
  }
}

// Function to update player information (turn a human into a zombie)
export async function modifyPlayer(playerId, playerData) {
  try {
    const response = await api.put(`/api/players/${playerId}`, playerData);
    return response.data;
  } catch (error) {
    console.error('Error updating player info', error);
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



export const fetchGamesByState = async (gameState) => {
  try {
    const response = await api.get(`/game/filterbystates/${gameState}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSquads = async () => {
  try {
    const response = await api.get('/Squad');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createSquad = async (squadName) => {
  try {
    const response = await api.post('/Squad', { SquadName: squadName });
    return response.data;
  } catch (error) {
    throw error;
  }
}; export default api;
