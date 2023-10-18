import React, { useState, useEffect } from 'react';
import { getCoordinatesByMissionId } from '../../services/useMissionAndLocation';

const MissionMarker = ({ missionId }) => {
    const [isPopOverVisible, setIsPopOverVisible] = useState(false);
    const [location, setLocation] = useState(null);


    const handleMarkerClick = (e) => {
        e.preventDefault();
        setIsPopOverVisible((prevState) => !prevState);
    };

    if (!location) return null;

    return (
        <div
            className="absolute bg-red-500 text-white aspect-square text-center flex flex-col justify-center p-1 rounded-full cursor-pointer transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            style={{
                left: `${getCoordinatesByMissionId(missionId).xCoordinate}%`,
                top: `${getCoordinatesByMissionId(missionId).yCoordinate}%`,
            }}
            onClick={handleMarkerClick}
        >
            M{missionId}
            {isPopOverVisible && (
                <div
                    className="text-black absolute whitespace-normal bg-white border border-gray-300 rounded-lg shadow-lg p-3"
                    style={{
                        left: `${location.xCoordinate}px`,
                        top: `${location.yCoordinate + 30}px`,
                    }}
                >
                    <h3 className="font-semibold text-gray-900">{location.name}</h3>
                    <p>{location.description}</p>
                </div>
            )}
        </div>
    );
};

export default MissionMarker;
