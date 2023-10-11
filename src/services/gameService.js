// gameService.js

import { fetchGames, fetchGamesByState } from './api';

export const getGames = async () => {
    try {
        const gamesData = await fetchGames();
        return gamesData;
    } catch (error) {
        throw error;
    }
};

export const getGamesByState = async (gameState) => {
    try {
        const gamesData = await fetchGamesByState(gameState);
        return gamesData;
    } catch (error) {
        throw error;
    }
};

export const getGameStatusValues = async () => {
    try {
        const gamesData = await fetchGames();
        // Extract game status values from the response
        const gameStatusValues = gamesData.map(game => game.gameState);
        // Remove duplicate values and return them
        return [...new Set(gameStatusValues)];
    } catch (error) {
        throw error;
    }
};