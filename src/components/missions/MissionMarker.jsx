import React, { useState } from 'react';
import PopOver from '../common/PopOver';

const MissionMarker = ({ x, y, missionId, missionTitle, missionDescription }) => {
    const [isPopOverVisible, setIsPopOverVisible] = useState(false);

    const handleMarkerClick = (e) => {
        e.preventDefault();
        console.log('Marker clicked');
        setIsPopOverVisible(!isPopOverVisible); // Toggle the popover visibility

    };

    return (
        <div >
            <div
                className="absolute bg-red-500 text-white aspect-square text-center flex flex-col justify-center p-1 rounded-full cursor-pointer"
                style={{
                    left: `${x}%`,
                    top: `${y}%`,
                }}
                onClick={handleMarkerClick}
            >
                M{missionId}
            </div>
            {isPopOverVisible && (
                <PopOver
                    title={missionTitle}
                    description={missionDescription}
                    style={{
                        left: { x }, // Adjust the popover position if needed
                        top: { y },  // Adjust the popover position if needed
                    }}
                    className="bg-white h-26 w-26"
                    onClose={() => setIsPopOverVisible(false)} // Close the popover when needed
                />
            )}
        </div>
    );
};

export default MissionMarker;
