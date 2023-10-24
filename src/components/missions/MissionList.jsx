import React, { useEffect, useState } from "react";
import MissionMarker from "./MissionMarker";
import { fetchMissionsForGame } from "../../services/mapService";

// MissionList component displays a list of missions for a selected game
const MissionList = () => {
  // Log information before rendering
  // Retrieve the game information from localStorage
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const missionIds = selectedGame.missionIds;

  const [missionData, setMissionData] = useState([]);

  useEffect(() => {
    async function fetchMissionData() {
      try {
        // Fetch mission data for the selected game
        const missionData = await fetchMissionsForGame(missionIds);
        setMissionData(missionData);
        console.log("Missiondata", missionData);
      } catch (error) {
        console.error("Failed to fetch missions:", error);
      }
    }
    
    // Trigger the data fetching process when the component mounts
    fetchMissionData(); 
  }, []);

  return (
    <ul>
      {missionData.map((mission) => (
        <li key={mission.id}>
          <MissionMarker missionId={mission.id} />
        </li>
      ))}
    </ul>
  );
};

export default MissionList;
