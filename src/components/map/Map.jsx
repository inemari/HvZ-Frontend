import React from 'react';
import map from '../../assets/images/Map1.png';
import MissionList from '../missions/MissionList';

const Map = () => {
  return (
    <div className="rounded-lg aspect-square bg-cover bg-clip-content relative w-full aspect-video" style={{ backgroundImage: `url(${map})` }}>
      <MissionList />
    </div>
  );
};

export default Map;
