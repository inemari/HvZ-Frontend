import React from 'react';
import Map from '../../components/map/Map';
import Container from '../../components/common/Container';

function MapPage({ locationHubConnection }) {
  return (
    <div className="flex items-center justify-center">
      <Container>
        <Map locationHubConnection={locationHubConnection} />
      </Container>
    </div>
  );
}

export default MapPage;