import axios from 'axios';

// Create an API instance with the base URL from environment variables
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

// Function to fetch coordinates from the API for the map
export const fetchCoordinates = async () => {
    try {
        const response = await api.get('/Location');
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to add a coordinate to the map via the API
export const addCoordinate = async (coordinate) => {
    try {
        const response = await api.post('/Location', coordinate);
        return response.data;
    } catch (error) {
        throw error;
    }
};
