import React, { useEffect, useState } from "react";
import map from "../../assets/images/Map1.png";
import MissionList from "../missions/MissionList";
import SquadListMarkers from "../squad/SquadListMarkers";
import KillList from "../kill/KillList";
import gravestone from "../../assets/icons/gravestone1.png";
const Map = ({ hubConnection }) => {
  const [rerenderMap, setRerenderMap] = useState(0);

 useEffect(() => {
    // When a message is received through locationHubConnection, trigger a re-render
    if (hubConnection) {
      console.log("useeffect triggers134");
      hubConnection.on("receivelocationupdate", () => {
        setRerenderMap((prev) => prev + 1);
      });
    }
  }, [hubConnection]); 

  return (
    <div className="rounded-lg bg-cover object-cover bg-clip-content relative w-full  aspect-video" style={{ backgroundImage: `url(${map})` }}>
      <div className='py-5 grid grid-flow-row absolute top-5 left-5 bg-black bg-opacity-80 h-fit text-center  w-fit p-2 rounded-lg'>
        <h3 className="text-lg font-bold text-center border-b mb-3">Markers</h3>
        <div className="flex p-2">
          <p className="h-fit w-fit bg-red-500 text-white aspect-square text-center flex flex-col justify-center p-1 rounded-full mr-5"
          >M1</p>
          <p>= Mission</p>
        </div>

        <div className="flex text-base p-2">
          <img src={gravestone} alt="Gravestone-icon" className="h-10 w-10 mr-3" />
          <p> = Player has been killed</p>
        </div><p>Click a marker to read more!</p>
      </div>
      <MissionList />
      <KillList />
      <SquadListMarkers
        key={rerenderMap}
        hubConnection={hubConnection} 
      />
    </div>
  );
};

export default Map;
