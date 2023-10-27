import React from 'react';
import Map from '../../components/map/Map';
import Container from '../../components/common/Container';
import GameStats from '../../components/game/GameStats';

function MapPage({ hubConnection }) {
  
  return (
    <div className="flex items-center justify-center">
      <Container>
        <GameStats></GameStats>
        <Map hubConnection={hubConnection}  />
      </Container>
    </div>
  );
}

export default MapPage;