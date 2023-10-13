// MissionList.js
import React from 'react';
import MissionMarker from './MissionMarker';

const MissionList = ({ missionData }) => {
  // Log information before rendering


  return (
    <ul>
      {missionData.map((mission) => (
        <li key={mission.id}>
          {/* <h3>{mission.name}</h3>
          <p>LocationId: {mission.locationId}</p>
          <p>xCoordinate: {mission.location?.xCoordinate || 'N/A'}</p> */}
          <MissionMarker
            missionId={mission.id}
            x={mission.location?.xCoordinate / 10 || 'N/A'}
            y={mission.location?.yCoordinate / 10 || 'N/A'}
            missionTitle={mission.name}
            missionDescription={mission.description}
          />
        </li>
      ))}
    </ul>
  );
};

export default MissionList;
