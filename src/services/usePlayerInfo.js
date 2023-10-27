// usePlayerInfo.js
import { useEffect, useState } from "react";
import api from "./api"; // Assuming you have the API functions in api.js

// Custom React hook for fetching player information.
const usePlayerInfo = (playerId) => {
  // State variable to store player information.
  const [playerInfo, setPlayerInfo] = useState(null);
   // State variable to track loading state.
  const [loading, setLoading] = useState(true);

    // Function to fetch player information from the API
  const fetchPlayerInfo = async () => {
    try {
      // Send a request to get player information by ID.
      const data = await api.getPlayerById(playerId);
      // Update the playerInfo state with the retrieved data.
      setPlayerInfo(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching player info:", error);
      setLoading(false);
    }
  };
// Use the useEffect hook to automatically fetch player information when the playerId changes.
  useEffect(() => {
    fetchPlayerInfo();
  }, [playerId]);
 // Return the player information and loading state for use in components.
  return { playerInfo, loading };
};

export default usePlayerInfo;
