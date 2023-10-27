import api from "../api/axios";
import playerService from "../api/services/playerService";
import locationService from "../api/services/locationService";

// Function to fetch mission details for a list of mission IDs.
export const fetchMissionsForGame = async (missionIds) => { // Initialize an empty array to store mission data.
  try {
    const missionData = [];
    
     // Loop through the provided mission IDs.
    for (const id of missionIds) {
      const response = await api.get(`/Mission/${id}`); // Fetch mission data by ID.
      const mission = response.data;
       // Fetch the location associated with the mission.
      const locationResponse = await api.get(`/Location/${mission.locationId}`);
      const location = locationResponse.data;
      // Associate the location data with the mission
      mission.location = location;
      
         // Add the mission to the missionData array.
      missionData.push(mission);
    }

    return missionData;  // Return the array of mission data.
  } catch (error) {
    throw new Error("Failed to fetch mission details"); // Handle and throw an error if fetching fails.
  }
};

// Function to fetch player details and their locations for a list of player IDs.
export const fetchPlayerLocationsForGame = async (playerIds) => {
  const joinedSquadId = sessionStorage.getItem("joinedSquadId");

  if (!joinedSquadId || joinedSquadId === "") {
    return; // Return nothing if selectedSquadId is empty or doesn't exist
  }

  try {
    const playerData = [];

    console.log("playerids ", playerIds);

      // Loop through the provided player IDs.
    for (const id of playerIds) {
      const player = await playerService.getById(id);
      if (player.squadId == joinedSquadId) {
        const location = await locationService.getById(player.locationId);
        console.log("Player location", location);
       
        // Associate the location data with the player.
        player.location = location;

           // Add the player to the playerData array.
        playerData.push(player);
      }
    }

    return playerData; // Return the array of player data with associated locations.
  } catch (error) {
    throw new Error("Failed to fetch player details");
  }
};
