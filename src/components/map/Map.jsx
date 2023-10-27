import React, { useEffect, useState } from "react";
import map from "../../assets/images/Map1.png";
import MissionList from "../missions/MissionList";
import SquadListMarkers from "../squad/SquadListMarkers";
import KillList from "../kill/KillList";
import MarkerInfo from "./MarkerInfo"; 

const Map = ({ locationHubConnection }) => {
  const [rerenderMap, setRerenderMap] = useState(0);

  useEffect(() => {
    if (locationHubConnection) {
      locationHubConnection.on("ReceiveLocationUpdate", () => {
        setRerenderMap((prev) => prev + 1);
      });
    }

    return () => {
      if (locationHubConnection) {
        locationHubConnection.off("ReceiveLocationUpdate");
      }
    };
  }, [locationHubConnection]);

  return (
    <div className="rounded-lg bg-cover object-cover bg-clip-content relative w-full  aspect-video" style={{ backgroundImage: `url(${map})` }}>
    <div className="relative w-full aspect-video">
      <div className="rounded-lg bg-cover object-cover bg-clip-content" >
        <MissionList />
        <KillList />
        <SquadListMarkers
          key={rerenderMap}
          locationHubConnection={locationHubConnection}
        />
      </div>
    </div>
    </div>
  );
};

export default Map;
