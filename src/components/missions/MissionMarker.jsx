import React, { useState, useEffect } from 'react';
import PopOver from '../common/PopOver';
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
                    data-popover-target="popover"
                    style={{
                        left: `${x}%`,
                        top: `${y}%`,
                    }}
                    onClick={handleMarkerClick}
                >
                    M{missionId}
                    
                    {/* Popover-in progress below */}
                    {/* <div
                        data-popover="popover"
                        class="displ absolute w-max whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none"
                    >
                        This is a very beautiful popover, show some love.
                    </div> */}
                    
                </div>

            )}
        </div>
    );
};

export default MissionMarker;
