import { fetchGames, fetchGamesByState } from "./api";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Function to remove duplicate items from an array based on a property
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

// Function to get all games
export const getGames = async () => {
  try {
    const gamesData = await fetchGames();
    return gamesData;
  } catch (error) {
    throw error;
  }
};


// Function to get games by their state
export const getGamesByState = async (gameState) => {
  try {
    const gamesData = await fetchGamesByState(gameState);
    return gamesData;
  } catch (error) {
    throw error;
  }
};

// Function to get unique game status values
export const getGameStatusValues = async () => {
  try {
    const gamesData = await fetchGames();
    // Extract game status values (both gameStateString and gameState) from the response
    const gameStatusValues = gamesData.map((game) => ({
      gameStateString: game.gameStateString,
      gameState: game.gameState,
    }));
    // Remove duplicate values and return them
    const uniqueGameStatusValues = removeDuplicates(
      gameStatusValues,
      "gameState"
    );
    return uniqueGameStatusValues;
  } catch (error) {
    throw error;
  }
};

// Function to post a new game
export const postGame = async (gameData) => {
  try {
    const response = await api.post("/Game", gameData);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to post Game:", error.response.data);
    }
    throw error;
  }
};

// Function to add a mission to a game
export const addMissionToGame = async (gameId, missionId) => {
  try {
    const response = await api.put(`/game/${gameId}/add-mission/${missionId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to add mission to Game:", error.response.data);
    }
    throw error;
  }
};

// Function to add a rule to a game
export const addRuleToGame = async (gameId, ruleId) => {
  try {
    const response = await api.put(`/game/${gameId}/add-rule/${ruleId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
        console.error("Failed to add rule to Game:", error.response.data);
      }
      throw error;
    }
};

// Function to get a game by its ID
export const getGame = async (gameId) => {
  try {
    const response = await api.get(`/game/${gameId}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to get Game:", error.response.data);
    }
    throw error;
  }
};