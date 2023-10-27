import React, { useState, useEffect } from "react";
import locationService from "../../api/services/locationService";
import playerService from "../../api/services/playerService";

const SquadMarker = ({ playerId }) => {
  const [playerData, setPlayerData] = useState(null);
  const [isPopOverVisible, setIsPopOverVisible] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const player = await playerService.getById(playerId);
        const location = await locationService.getById(player.locationId);

        // Extract x and y coordinates from the location object
        const xCoordinate = location.xCoordinate;
        const yCoordinate = location.yCoordinate;

        // Set the x and y coordinates in the state
        setX(xCoordinate);
        setY(yCoordinate);

        player.location = location;
        setPlayerData(player);
        console.log("player: ", player);
      } catch (error) {
        console.error("Failed to fetch player or location:", error);
      }
    }

    fetchData();
  }, [playerId]);

  const handleMarkerClick = (e) => {
    e.preventDefault();
    setIsPopOverVisible(!isPopOverVisible); // Toggle the popover visibility
  };

  return (
    <div>
      {x !== null && y !== null && (
        <div
          className="absolute bg-blue-500 text-white aspect-square text-center flex flex-col justify-center p-1 rounded-full cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
          onClick={handleMarkerClick}
        >
          P{playerId}
          {isPopOverVisible && playerData && (
            <div
              className="absolute whitespace-normal  text-gray-400 border-gray-600 bg-gray-800 break-words rounded-lg border font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
              style={{
                left: `${x}px`, // Adjust the popover position if needed
                top: `${y + 30}px`, // Adjust the popover position if needed
              }}
            >
              <div className="px-3 py-2  border-b  rounded-t-lg border-gray-600 bg-gray-700">
                <h3 className="font-semibold  text-white">
                  {" "}
                  {playerData.username}
                </h3>
              </div>
              {/*               <div className="px-3 py-2">
                <p>{playerData.biteCode}</p>
              </div> */}
              <div className="px-3 py-2">
                <p>{`x: ${playerData.location.xCoordinate}`}</p>
              </div>
              <div className="px-3 py-2">
                <p>{`y: ${playerData.location.yCoordinate}`}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SquadMarker;
