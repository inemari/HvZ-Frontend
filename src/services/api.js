// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export async function fetchPlayerInfo(playerId) {
  try {
    const response = await api.get(`/players/${playerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player info', error);
    throw error;
  }
}

export async function modifyPlayer(playerId, playerData) {
  try {
    const response = await api.put(`/players/${playerId}`, playerData);
    return response.data;
  } catch (error) {
    console.error('Error updating player info', error);
    throw error;
  }
}

//NOTE: Not sure if completed, checked back-end but might be wrong.

export async function turnHumanIntoZombie(playerId, updatedData) {
  try {
    // Send a PUT request to update the player's status to zombie
    const response = await api.put(`/players/${playerId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating player status', error);
    throw error;
  }
}

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

export const getPlayerById = async (playerId) => {
  try {
    const response = await api.get(`/players/${playerId}`);
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
};

export const getSquadById = async (squadId) => {
  try {
    const response = await api.get(`/Squad/${squadId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createSquad = async (squadName) => {
  try {
    const response = await api.post('/Squad', { SquadName: squadName });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default api; 
