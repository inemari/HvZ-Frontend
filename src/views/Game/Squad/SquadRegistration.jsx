import React from 'react';
import SquadCreate from '../../../components/squad/SquadCreate';
import SquadList from '../../../components/squad/SquadList';

const SquadRegistration = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SquadCreate />
        <SquadList />
    </div>
  );
};

export default SquadRegistration;