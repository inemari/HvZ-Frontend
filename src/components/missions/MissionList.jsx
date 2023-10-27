// MissionList.js
import React, { useEffect, useState } from "react";
import MissionMarker from "./MissionMarker";
import { fetchMissionsForGame } from "../../services/mapService";

// MissionList component displays a list of missions for the selected game
const MissionList = () => {
  // Log information before rendering
  // Retrieve the game information from localStorage
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const missionIds = selectedGame.missionIds;

  const [missionData, setMissionData] = useState([]);

  useEffect(() => {
    // Asynchronously fetch mission data for the selected game.
    async function fetchMissionData() {
      try {
        const missionData = await fetchMissionsForGame(missionIds);
        setMissionData(missionData);
      } catch (error) {
        console.error("Failed to fetch missions:", error);
      }
    }

    fetchMissionData();
  }, []);

  return (
    <ul>
      {(sessionStorage.getItem("joinedGame") || false) ? (
        missionData.map((mission) => (
          <li key={mission.id}>
            <MissionMarker missionId={mission.id} />
          </li>
        ))
      ) : (
        <p></p>
      )}
    </ul>
  );
}

export default MissionList;
