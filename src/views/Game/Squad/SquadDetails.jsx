import React from 'react';
import SquadInformation from '../../../components/squad/SquadInformation';

const SquadDetails = ({ locationHubConnection }) => {
  const selectedSquadId = sessionStorage.getItem('selectedSquadId');

  return (
    <div>
      <h2>Squad Details</h2>
      <SquadInformation squadId={selectedSquadId} locationHubConnection={locationHubConnection} /> 
    </div>
  );
};

export default SquadDetails;
