import React from 'react';
import map from '../../assets/images/Map1.png';
import MissionList from '../missions/MissionList';
import GravestoneMarker from '../gravestones/GravestoneMarker'; // Import GravestoneMarker

const Map = () => {
  return (
    <div className="rounded-lg bg-cover object-cover bg-clip-content relative w-full aspect-video" style={{ backgroundImage: `url(${map})` }}>
      <MissionList />
      <GravestoneMarker />
    </div>
  );
};

export default Map;
