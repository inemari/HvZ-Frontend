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