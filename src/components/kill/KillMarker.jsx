import React, { useState, useEffect } from "react";
import gravestoneIcon from "../../assets/icons/gravestone1.png";
import locationService from "../../api/services/locationService";
import playerService from "../../api/services/playerService";
import killService from "../../api/services/killService";

const KillMarker = ({ killId }) => {
  const [killData, setKillData] = useState(null);
  const [isPopOverVisible, setIsPopOverVisible] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);
  const [playerName, setPlayerName] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const kill = await killService.getById(killId);
        const location = await locationService.getById(kill.locationId);
        const player = await playerService.getById(kill.playerId);
        setPlayerName(player.username);

        // Extract x and y coordinates from the location object
        const xCoordinate = location.xCoordinate;
        const yCoordinate = location.yCoordinate;

        // Set the x and y coordinates in the state
        setX(xCoordinate);
        setY(yCoordinate);

        kill.location = location;
        setKillData(kill);
      } catch (error) {
        console.error("Failed to fetch kill or location:", error);
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
          className="absolute cursor-pointer"
          data-ripple-light="true"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            zIndex: isPopOverVisible ? 2 : 1, // Set a higher zIndex when the text box is visible
          }}
          onClick={handleMarkerClick}
        >
          <img
            src={gravestoneIcon}
            alt="Gravestone"
            className="w-8 h-8 hover:opacity-75"
          />
          {isPopOverVisible && killData && (
            <div
              className="w-96 absolute whitespace-normal bg-white border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 break-words rounded-lg border font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
              style={{
                left: `${x + 60}%`,
                top: `${y}%`,
              }}
            >
              <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                <h3 className="font-semibold text-white">
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
