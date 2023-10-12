// GameMap.js
import React, { useState, useEffect } from 'react';
import { fetchMissionsForGame } from '../../services/mapService';
import MissionList from '../missions/MissionList';

const GameMap = ({ gameData }) => {
  // Retrieve the game information from localStorage
  const selectedGame = JSON.parse(localStorage.getItem('selectedGame'));
  const missionIds = selectedGame.missionIds;

  const [missionData, setMissionData] = useState([]);

  useEffect(() => {
    async function fetchMissionData() {
      try {
        const missionData = await fetchMissionsForGame(missionIds);
        setMissionData(missionData);
      } catch (error) {
        console.error('Failed to fetch missions:', error);
      }
    }

    fetchMissionData();
  }, [missionIds]);

  return (
    <div className='text-white'>
      <MissionList missionData={missionData} />
    </div>
  );
};

export default GameMap;
