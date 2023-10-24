import React, { useState, useEffect } from "react";
import { getPlayerById } from "../../services/api";
import { getLocation } from "../../services/locationService";

// SquadMarker component displays a marker for a player and provides a popover with player information
const SquadMarker = ({ playerId }) => {
  const [playerData, setPlayerData] = useState(null);
  const [isPopOverVisible, setIsPopOverVisible] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  
   // Use an effect to fetch player data and location when playerId changes
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch player data by playerId
        const player = await getPlayerById(playerId);

        // Fetch location data by locationId from player
        const location = await getLocation(player.locationId);

        // Extract x and y coordinates from the location object
        const xCoordinate = location.xCoordinate;
        const yCoordinate = location.yCoordinate;

        // Set the x and y coordinates in the state
        setX(xCoordinate);
        setY(yCoordinate);
        
        // Attach location data to player data
        player.location = location;
        setPlayerData(player);
        console.log("player: ", player)
      } catch (error) {
        console.error("Failed to fetch player or location:", error);
      } 
    }

    fetchData();
  }, [playerId]);
   
  // Handle click event to toggle popover visibility
  const handleMarkerClick = (e) => {
    e.preventDefault();
    setIsPopOverVisible(!isPopOverVisible); 
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
              className="text-black absolute whitespace-normal bg-white  border-gray-200  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 break-words rounded-lg border font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
              style={{
                left: `${x}px`, 
                top: `${y + 30}px`, 
              }}
            >
              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">
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
