// api.js

import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const fetchGames = async () => {
    try {
        const response = await api.get('/game');
        return response.data;
    } catch (error) {
        throw error;
    }
};

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
      const response = await api.post('/Squad', { name: squadName }); // Replace '/Squad' with your API endpoint
      return response.data;
    } catch (error) {
      throw error;
    }
  };