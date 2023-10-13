import { fetchGames, fetchGamesByState } from "./api";

function removeDuplicates(arr, prop) {
    const unique = new Set();
    return arr.filter((item) => {
        const value = item[prop];
        if (unique.has(value)) {
            return false; // Duplicate, exclude it
        }
        unique.add(value);
        return true; // Not a duplicate, include it
    });
}

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
        // Extract game status values (both gameStateString and gameState) from the response
        const gameStatusValues = gamesData.map((game) => ({
            gameStateString: game.gameStateString,
            gameState: game.gameState,
        }));
        // Remove duplicate values and return them
        const uniqueGameStatusValues = removeDuplicates(gameStatusValues, 'gameState');
        return uniqueGameStatusValues;
    } catch (error) {
        throw error;
    }
};
