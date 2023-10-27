import React from 'react';
import Map from '../../components/map/Map';
import Container from '../../components/common/Container';
import GameStats from '../../components/game/GameStats';
import MarkerInfo from '../../components/map/MarkerInfo';

function MapPage({ locationHubConnection }) {

  return (
    <div className="flex items-center justify-center">
      <Container>
        <GameStats></GameStats>
        <MarkerInfo />
        <Map locationHubConnection={locationHubConnection} />
      </Container>
    </div>
  );
}

export default MapPage;