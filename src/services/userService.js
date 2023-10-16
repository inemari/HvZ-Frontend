// userService.js
import { createPlayer, createUser, checkUserExistence } from "./api"; 
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

export const checkIfExists = async () => {
    try {
        const user = await checkUserExistence();
        if (user === null) {
            const user = await createUser();
            return user;
        } else {
            return user;
        }
    } catch (error) {
        throw error;
    }
}

export const createNewPlayer = async (userName, gameId) => {
    try {
        const newPlayer = await createPlayer(userName, gameId);
        return newPlayer;
    } catch (error) {
        throw error;
    }
}

export default {
    saveUsername,
    createNewPlayer,
    checkIfExists,
};
