import React, { useEffect, useState } from "react";
import map from "../../assets/images/Map1.png";
import MissionList from "../missions/MissionList";
import SquadListMarkers from "../squad/SquadListMarkers";
import KillList from "../kill/KillList";

// Map component responsible for rendering the game map
const Map = ({ locationHubConnection }) => {
  const [rerenderMap, setRerenderMap] = useState(0);

  useEffect(() => {
    // When a message is received through locationHubConnection, trigger a re-render
    if (locationHubConnection) {
      console.log("useeffect triggers134");
      locationHubConnection.on("ReceiveLocationUpdate", () => {
        setRerenderMap((prev) => prev + 1);
      });
    }

    return () => {
      // Clean up the event listener when the component unmounts
      if (locationHubConnection) {
        locationHubConnection.off("ReceiveLocationUpdate");
      }
    };
  }, [locationHubConnection]);

  return (
    <div className="rounded-lg bg-cover object-cover bg-clip-content relative w-full aspect-video" style={{ backgroundImage: `url(${map})` }}>
      <MissionList />
       <KillList />
      <SquadListMarkers
        key={rerenderMap}
        locationHubConnection={locationHubConnection}
      />
    </div>
  );
};

export default Map;
