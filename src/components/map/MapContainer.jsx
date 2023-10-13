// import React, { useState, useEffect } from 'react';
// import { fetchGame, fetchMissionDetails } from '../../services/mapService'; // Import necessary functions
// import MissionMarker from './MissionMarker';
// import CoordinateMaker from './CoordinateMaker';

// const GameMap = ({ gameData }) => {
//     const [coordinates, setCoordinates] = useState([]);
//     const [missions, setMissions] = useState([]); // Store mission details here

//     const addCoordinate = (newCoordinate) => {
//         setCoordinates([...coordinates, newCoordinate]);
//     };

//     useEffect(() => {
//         async function fetchGameMissions(gameId) {
//             try {
//                 const game = await fetchGame(gameId);
//                 const missionIds = game.missionIds; // Assuming missionIds is a property of the game
//                 if (!missionIds || missionIds.length === 0) {
//                     console.error('No mission IDs found for the selected game.');
//                     return;
//                 }

//                 const missionDetails = await fetchMissionDetails(missionIds);
//                 console.log('Mission Details:', missionDetails);

//                 // Set the mission details in state
//                 setMissions(missionDetails);
//             } catch (error) {
//                 console.error('Failed to fetch mission details:', error);
//             }
//         }

//         if (gameData && gameData.id) {
//             fetchGameMissions(gameData.id); // Assuming gameData contains the game ID
//         } else {
//             console.error('Selected game data is missing or invalid.');
//         }
//     }, [gameData]);

//     return (
//         <div className="flex items-center justify-center">
//             <div className="container mx-auto p-8 bg-gray-600 rounded-lg">
//                 <div className="relative aspect-square bg-gray-600">
//                     {coordinates.map((coordinate, index) => (
//                         <div
//                             key={index}
//                             className="absolute bg-red-500 text-white w-6 h-6 rounded-full text-center"
//                             style={{
//                                 left: `${coordinate.x}%`,
//                                 top: `${coordinate.y}%`,
//                             }}
//                         >
//                             {index + 1}
//                         </div>
//                     ))}
//                     {missions.map((mission) => (
//                         <MissionMarker
//                             key={mission.id}
//                             x={mission.location.x} // Assuming location.x is the correct property
//                             y={mission.location.y} // Assuming location.y is the correct property
//                             missionId={mission.id}
//                         />
//                     ))}
//                 </div>
//                 <CoordinateMaker onAddCoordinate={addCoordinate} />
//             </div>
//         </div>
//     );
// };

// export default GameMap;
