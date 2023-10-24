// MissionList.js
import React, { useEffect, useState } from "react";
import KillMarker from "./KillMarker";
import { getKillsInGame } from "../../services/killService";

const KillList = () => {
  // Log information before rendering
  // Retrieve the game information from localStorage
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const killIds = selectedGame.missionIds;

  const [killData, setKillData] = useState([]);

  useEffect(() => {
    // Asynchronous function to fetch kill locations with details
    async function fetchKillsWithDetails() {
      try {
        // Fetch kill locations with details from the service
        const killsAndPlayerInfoInGame = await getKillsInGame(selectedGame.id);
        setKillData(killsAndPlayerInfoInGame);
        //console.log("Fetched kill locations with details", killData);
      } catch (error) {
        console.error("Failed to fetch kill locations with details:", error);
      }
    }

    // Call the function to fetch data when the component mounts
    fetchKillsWithDetails();
   
  }, []);

  return (
    <ul>
      {killData.map((kill) => (
        <li key={kill.id}>
          <KillMarker killId={kill.id} />
        </li>
      ))}
    </ul>
  );
};

export default KillList;
