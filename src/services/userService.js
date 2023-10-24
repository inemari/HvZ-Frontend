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
        
        // Send a POST request to create a new player with the provided username and game ID
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

// Function to check if a user exists and create one if not
export const checkIfExists = async () => {
    try {
        const user = await checkUserExistence();
        if (user === null) {
            // If the user does not exist, create a new user
            const user = await createUser();
            return user;
        } else {
            // If the user already exists, return the existing user data
            return user;
        }
    } catch (error) {
        throw error;
    }
}

// Function to create a new player
export const createNewPlayer = async (userName, gameId) => {
    try {
        // Create a new player with the provided username and game ID
        const newPlayer = await createPlayer(userName, gameId);
        return newPlayer;
    } catch (error) {
        throw error;
    }
}

// Export the functions and methods from this service
export default {
    saveUsername,
    createNewPlayer,
    checkIfExists,
};
