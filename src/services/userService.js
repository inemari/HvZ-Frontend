// userService.js

import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL; // Replace with your API URL

// Function to save the username to the database
export const saveUsername = async (username, gameId) => {
    try {
        const data = {
            username,
            zombie: true,
            biteCode: 'string',
            userId: 0,
            locationId: 0,
            squadId: 0,
            gameId,
        };

        const response = await axios.post(`${BASE_URL}/Player`, data);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Failed to save username');
        }
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export default {
    saveUsername,
};
