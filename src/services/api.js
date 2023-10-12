import axios from 'axios';

// Create an API instance with the base URL from environment variables
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Function to fetch games from the API
export const fetchGames = async () => {
    try {
        const response = await api.get('/game');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to fetch games filtered by state from the API
export const fetchGamesByState = async (gameState) => {
    try {
        const response = await api.get(`/game/filterbystates/${gameState}`);
        return response.data;
    } catch (error) {
        throw error; 
    }
};

// Function to fetch coordinates from the API
export const fetchCoordinates = async () => {
    try {
        const response = await api.get('/Location');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to add a coordinate to the API
export const addCoordinate = async (newCoordinate) => {
    try {
        const response = await api.post('/Location', newCoordinate);
        return response.data;
    } catch (error) {
        throw error;
    }
};
