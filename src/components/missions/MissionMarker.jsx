import React, { useState, useEffect } from "react";
import missionService from "../../api/services/missionService";
import locationService from "../../api/services/locationService";

const MissionMarker = ({ missionId }) => {
  // State variables to store mission data, popover visibility, and coordinates
  const [missionData, setMissionData] = useState(null);
  const [isPopOverVisible, setIsPopOverVisible] = useState(false);
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  // UseEffect to fetch mission data and location when missionId changes
  useEffect(() => {
    async function fetchData() {
      try {
        const mission = await missionService.getById(missionId);
        const location = await locationService.getById(mission.locationId);
        const xCoordinate = location.xCoordinate;
        const yCoordinate = location.yCoordinate;
        setX(xCoordinate);
        setY(yCoordinate);
        mission.location = location;
        setMissionData(mission);
      } catch (error) {
        console.error("Failed to fetch mission or location:", error);
      }
    }

    // Fetch mission data when the missionId changes
    fetchData();
  }, [missionId]);

  // Handler to toggle popover visibility when the marker is clicked
  const handleMarkerClick = (e) => {
    e.preventDefault();
    setIsPopOverVisible(!isPopOverVisible);
  };

  return (
    <div>
      {x !== null && y !== null && (
        <div
          className="absolute bg-red-500 text-white aspect-square text-center flex flex-col justify-center p-1 rounded-full cursor-pointer transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            zIndex: 1, // Ensures the marker is in front of everything
          }}
          onClick={handleMarkerClick}
        >
          M{missionId}
          {isPopOverVisible && missionData && (
            <div
              className=" w-64 absolute whitespace-normal  text-gray-400 border-gray-600 bg-gray-800 break-words rounded-lg border font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
              style={{
                left: `${x + 60}%`,
                top: `${y}%`,
                zIndex: 2, // Ensures the text box is in front of everything
              }}
            >
              <div className="px-3 py-2 border-b w-64 rounded-t-lg border-gray-600 bg-gray-700">
                <h3 className="font-semibold text-white">
                  {missionData.name}
                </h3>
              </div>
              <div className="px-3 py-2">
                <p className="whitespace-pre-wrap">{missionData.description}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MissionMarker;
