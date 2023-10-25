// MissionList.js
import React, { useEffect, useState } from "react";
import MissionMarker from "./MissionMarker";
import { fetchMissionsForGame } from "../../services/mapService";

const MissionList = () => {
  // Log information before rendering
  // Retrieve the game information from localStorage
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const missionIds = selectedGame.missionIds;

  const [missionData, setMissionData] = useState([]);

  useEffect(() => {
    async function fetchMissionData() {
      try {
        console.log("idsids", missionIds);
        const missionData = await fetchMissionsForGame(missionIds);
        setMissionData(missionData);
        console.log("Missiondata", missionData);
      } catch (error) {
        console.error("Failed to fetch missions:", error);
      }
    }

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
