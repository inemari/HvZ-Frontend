
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const fetchGames = async () => {
    try {
        const response = await api.get('/games');
        return response.data;
    } catch (error) {
        throw error;
    }
};