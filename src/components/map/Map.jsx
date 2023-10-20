import React from 'react';
import map from '../../assets/images/Map1.png';
import MissionList from '../missions/MissionList';
import GravestoneMarker from '../gravestones/GravestoneMarker'; // Import GravestoneMarker

const Map = () => {
  return (
    <div className="container rounded-lg aspect-square bg-cover bg-clip-content relative" style={{ backgroundImage: `url(${map})` }}>
      <MissionList />
      <GravestoneMarker />
    </div>
  );
};

export default Map;
