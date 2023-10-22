import React, { useState } from "react";
import SquadCreate from "../../../components/squad/SquadCreate";
import SquadList from "../../../components/squad/SquadList";

const SquadRegistration = () => {
  const [squadListUpdated, setSquadListUpdated] = useState(false);

  const handleSquadCreated = () => {
    // This function will be called when a new squad is created.
    setSquadListUpdated(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <SquadCreate onSquadCreated={handleSquadCreated} />
      <SquadList squadListUpdated={squadListUpdated} />
    </div>
  );
};

export default SquadRegistration;
