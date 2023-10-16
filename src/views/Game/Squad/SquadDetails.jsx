import React from 'react';
import SquadInformation from '../../../components/squad/SquadInformation';

const SquadDetails = () => {
  const selectedSquadId = localStorage.getItem('selectedSquadId');

  return (
    <div>
      <h2>Squad Details</h2>
      <SquadInformation squadId={selectedSquadId} /> 
    </div>
  );
};

export default SquadDetails;
