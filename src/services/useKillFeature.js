// useKillFeature.js
import { useState } from 'react';
import api from './api';

export async function getKill(id) {
  try {
    const response = await api.get(`/kill/${id}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Handle specific API error message here
      console.error('API Error:', error.response.data);
    } else {
      // Handle other errors
      console.error('Error getting kill', error);
    }
    throw error;
  }
}


const useKillFeature = () => {
  const [bitecode, setBitecode] = useState('');
  const [error, setError] = useState('');
  const [isKilled, setIsKilled] = useState(false);
  const [killInfo, setKillInfo] = useState(null); // State to hold kill information

  async function turnHumanIntoZombie(code) {
    try {
      // Send a PUT request to update the player's status to zombie
      const response = await api.put(`/players/by-bitecode/${code}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific API error message here
        console.error('API Error:', error.response.data);
      } else {
        // Handle other errors
        console.error('Error updating player status', error);
      }
      throw error;
    }
  }

  async function createKill(playerId) {
    try {
      // Get the current time
      const date = new Date();
      const time = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

      // Send a POST request to create a new kill record
      const response = await api.post(`/kill`, {
        playerId: playerId,
      });

      // Set the kill information to state
      setKillInfo(response.data);

      return getKill(response.data.id);
    } catch (error) {
      if (error.response && error.response.data) {
        // Handle specific API error message here
        console.error('API Error:', error.response.data);
      } else {
        // Handle other errors
        console.error('Error creating new kill', error);
      }
      throw error;
    }
  }

  const handleKill = async (bitecode) => {
    // Check if the bitecode is not empty
    if (bitecode.trim() === '') {
      setError('Bitecode is required.');
    } else {
      try {
        // Call the API to turn the human into a zombie
        await turnHumanIntoZombie(bitecode);
        console.log("Turned into zombie");
        const player = await api.get`/players/by-bitecode/${bitecode}`;
        await createKill(player.id);
        console.log("Created kill");
        setIsKilled(true); // Set a flag to indicate success
        console.log("Set killed to true");
      } catch (error) {
        setError('Failed to turn human into a zombie');
      }
    }
  };

  return {
    bitecode,
    error,
    isKilled,
    setBitecode,
    handleKill,
    killInfo, // Include kill information in the return object
  };
};

export default useKillFeature;

