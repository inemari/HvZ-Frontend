import React, { useState } from "react";
import SquadCreate from "../../../components/squad/SquadCreate";
import SquadList from "../../../components/squad/SquadList";

const SquadRegistration = () => {
  // Define a state variable to track whether the squad list has been updated
  const [squadListUpdated, setSquadListUpdated] = useState(false);

  const handleSquadCreated = () => {
    // This function will be called when a new squad is created.
    setSquadListUpdated(true);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Render the SquadCreate component and pass the handleSquadCreated function */}
      <SquadCreate onSquadCreated={handleSquadCreated} />

      {/* Render the SquadList component and pass the squadListUpdated state */}
      <SquadList squadListUpdated={squadListUpdated} />
    </div>
  );
};

export default SquadRegistration;
