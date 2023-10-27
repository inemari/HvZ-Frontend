import React from 'react';
import SquadInformation from '../../../components/squad/SquadInformation';

const SquadDetails = ({ hubConnection }) => {
  const selectedSquadId = sessionStorage.getItem('selectedSquadId');

  return (
    <div>
      <h2>Squad Details</h2>
      <SquadInformation squadId={selectedSquadId} hubConnection={hubConnection}  /> 
    </div>
  );
};

export default SquadDetails;
