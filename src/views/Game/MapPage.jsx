import React from 'react';
import Map from '../../components/map/Map';
import Container from '../../components/common/Container';

function MapPage({ locationHubConnection }) {
  return (
    <div className="flex items-center justify-center">
      <Container>
        {/* Render the Map component, passing the locationHubConnection as a prop */}
        <Map locationHubConnection={locationHubConnection} />
      </Container>
    </div>
  );
}

export default MapPage;