import React, { useState, useEffect } from 'react';
import { getMission, getLocation } from '../../services/mapService';

const MissionMarker = ({ missionId }) => {
    const [missionData, setMissionData] = useState(null);
    const [isPopOverVisible, setIsPopOverVisible] = useState(false);
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const mission = await getMission(missionId);
                const location = await getLocation(mission.locationId);

                // Extract x and y coordinates from the location object
                const xCoordinate = location.xCoordinate;
                const yCoordinate = location.yCoordinate;

                // Set the x and y coordinates in the state
                setX(xCoordinate);
                setY(yCoordinate);

                mission.location = location;
                setMissionData(mission);
            } catch (error) {
                console.error('Failed to fetch mission or location:', error);
            }
        }

        fetchData();
    }, [missionId]);

    const handleMarkerClick = (e) => {
        e.preventDefault();
        setIsPopOverVisible(!isPopOverVisible); // Toggle the popover visibility
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
                    }}
                    onClick={handleMarkerClick}
                >
                    M{missionId}
                    {isPopOverVisible && missionData && (
                        <div
                            className="text-black absolute whitespace-normal bg-white  border-gray-200  dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 break-words rounded-lg border font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                            style={{
                                left: `${x}px`, // Adjust the popover position if needed
                                top: `${y + 30}px`, // Adjust the popover position if needed
                            }}
                        >
                            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white"> {missionData.name}</h3>
                            </div>
                            <div className="px-3 py-2">
                                <p>{missionData.description}</p>
                            </div>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MissionMarker;
