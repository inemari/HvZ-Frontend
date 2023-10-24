// // usePlayerInfo.js
// import { useEffect, useState } from 'react';
// import api from './api'; // Assuming you have the API functions in api.js

// const usePlayerInfo = (playerId) => {
//     const [playerInfo, setPlayerInfo] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const fetchPlayerInfo = async () => {
//         try {
//             const data = await api.getPlayerById(playerId);
//             setPlayerInfo(data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching player info:', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchPlayerInfo();
//     }, [playerId]);

//     return { playerInfo, loading };
// };

// export default usePlayerInfo;
