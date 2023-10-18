import React from 'react';
import MissionMarker from './MissionMarker';
import { getCoordinatesByMissionId } from '../../services/useMissionAndLocation';

const MissionList = () => {
  const selectedGame = JSON.parse(localStorage.getItem('selectedGame'));
  const missions = selectedGame?.missionIds || []; // Assuming missionIds is an array

  return (
    <>
      {missions.map((missionId) => (
        <MissionMarker key={missionId} missionId={missionId} />
      ))}
    </>
  );
};

export default MissionList;
