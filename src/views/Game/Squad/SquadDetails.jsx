import React from 'react';
import SquadInformation from '../../../components/squad/SquadInformation';

const SquadDetails = ({ locationHubConnection }) => {
  // Retrieve the selected squad ID from session storage
  const selectedSquadId = sessionStorage.getItem('selectedSquadId');

  return (
    <div>
      <h2>Squad Details</h2>
      {/* Render the SquadInformation component and pass the selected squad ID and locationHubConnection */}
      <SquadInformation squadId={selectedSquadId} locationHubConnection={locationHubConnection} /> 
    </div>
  );
};

export default SquadDetails;
