import React, { useState, useEffect } from "react";
import { getMission } from "../../services/mapService";
import { getLocation } from "../../services/locationService";
import { getKill } from "../../services/killService";
import gravestoneIcon from "../../assets/icons/gravestone1.png";
import { getPlayer } from "../../services/playerService";

// KillMarker component displays a gravestone marker on the map
// It fetches kill data and displays additional information when clicked
const KillMarker = ({ killId }) => {
  const [killData, setKillData] = useState(null);
  const [isPopOverVisible, setIsPopOverVisible] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    // Fetch data for the given kill when the component mounts
    async function fetchData() {
      try {
        const kill = await getKill(killId);
        const location = await getLocation(kill.locationId);
        const player = await getPlayer(kill.playerId);
        setPlayerName(player.username)

        // Extract x and y coordinates from the location object
        const xCoordinate = location.xCoordinate;
        const yCoordinate = location.yCoordinate;

        // Set the x and y coordinates in the state
        setX(xCoordinate);
        setY(yCoordinate);

        kill.location = location;
        setKillData(kill);
      } catch (error) {
        console.error("Failed to fetch mission or location:", error);
      }
    }

    fetchData();
  }, [killId]);

  const handleMarkerClick = (e) => {
    e.preventDefault();
    setIsPopOverVisible(!isPopOverVisible); // Toggle the popover visibility
  };

  return (
    <div>
      {x !== null && y !== null && (
        <div
          className="absolute"
          data-ripple-light="true"
          style={{
            left: `${x}%`,
            top: `${y}%`,
          }}
          onClick={handleMarkerClick}
        >
          <img src={gravestoneIcon} alt="Gravestone" className="w-8 h-8" />
         {/*  {killId} */}
          {isPopOverVisible && killData && (
            <div
              className="w-100 text-black absolute whitespace-normal bg-white  border-gray-200  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 break-words rounded-lg border font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
              style={{
                left: `${x}px`, 
                top: `${y + 30}px`, 
              }}
            >
              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {" "}
                  {playerName}
                </h3>
              </div>
              <div className="px-3 py-2">
                <p>{killData.description}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default KillMarker;
