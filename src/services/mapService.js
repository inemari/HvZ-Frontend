import api from "./api";

import { getKills } from "./killService";
import { getPlayer } from "./playerService";
import { getLocation } from "./locationService";
import playerService from "../api/services/playerService";
import locationService from "../api/services/locationService";

export const getMission = async (id) => {
  try {
    const response = await api.get(`/Mission/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch missions");
  }
};

export const fetchMissionsForGame = async (missionIds) => {
  try {
    const missionData = [];

    for (const id of missionIds) {
      const response = await api.get(`/Mission/${id}`);
      const mission = response.data;
      const locationResponse = await api.get(`/Location/${mission.locationId}`);
      const location = locationResponse.data;
      mission.location = location;
      missionData.push(mission);
    }

    return missionData;
  } catch (error) {
    throw new Error("Failed to fetch mission details");
  }
};

export const fetchPlayerLocationsForGame = async (playerIds) => {
  const joinedSquadId = sessionStorage.getItem("joinedSquadId");

  if (!joinedSquadId || joinedSquadId === "") {
    return; // Return nothing if selectedSquadId is empty or doesn't exist
  }

  try {
    const playerData = [];

    console.log("playerids ", playerIds);
    for (const id of playerIds) {
      const player = await playerService.getById(id);
      if (player.squadId == joinedSquadId) {
        const location = await locationService.getById(player.locationId);
        console.log("Player location", location);
        player.location = location;
        playerData.push(player);
      }
    }

    return playerData;
  } catch (error) {
    throw new Error("Failed to fetch player details");
  }
};

export const addCoordinateToMission = async (x, y, gameId) => {
  try {
    const response = await api.post(`/Mission`, {
      x,
      y,
      gameId,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to add coordinate to mission");
  }
};

export const createMission = async (missionData) => {
  try {
    const response = await api.post(`/Mission`, missionData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create a new mission");
  }
};
export const createLocation = async (locationData) => {
  try {
    const response = await api.post(`/Location`, locationData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create a new location");
  }
};

export const getKillLocations = async () => {
  try {
    const response = await api.get(`/Kill/GetKills`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch kill locations");
  }
};

export const getLocationById = async (locationId) => {
  try {
    const response = await api.get(`/Location/${locationId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch location by ID");
  }
};

/* NOTE: Working with GET kill and to add a grave stone fof the location where the player is killed.
  /  The following files to work with are: gravestones/GravestoneList.jsx, gravestones/GravestoneMarker.jsx, map/Map.jsx.
  /  For help or inspiration look in missions/MissionList.jsx and missions/MissionMarker.jsx
  /  The following errors from the debugging below lies in the console on the Map page in the application. 
  */

// A function that combines the two functions to fetch kill locations with details
export const getKillLocationsWithDetails = async () => {
  try {
    // Fetch kill locations using the getKillLocations function
    const killLocations = await getKillLocations();

    // Fetch details for each kill location and store them in an array
    const locationsWithDetails = await Promise.all(
      killLocations.map(async (killLocation) => {
        // Check if the location ID is valid (not null)
        if (killLocation && killLocation.locationId !== null) {
          try {
            // Fetch the location details for this kill location
            const location = await getLocationById(killLocation.locationId);
            return {
              location,
            };
          } catch (error) {
            // Log an error if there was an issue fetching location details
            console.error("Failed to fetch location details:", error);
            // Also log the kill location that caused the error
            console.error("Error occurred for killLocation:", killLocation);
            return null; // Return null for failed locations
          }
        } else {
          // Log a warning for invalid or missing location IDs
          console.warn(
            "Invalid or missing location ID. Skipping entry:",
            killLocation
          );
          // Also log the kill location that was skipped
          console.error("Error occurred for killLocation:", killLocation);
          return null; // Return null for invalid or missing location IDs
        }
      })
    );

    // Filter out null values (failed locations) from the results
    const filteredLocationsWithDetails = locationsWithDetails.filter(
      (location) => location !== null
    );

    return filteredLocationsWithDetails;
  } catch (error) {
    // If there's an error at any point in the process, throw an error
    throw new Error("Failed to fetch kill locations with details");
  }
};

export const getSquadMarkers = async () => {
  try {
    // Fetch kill locations using the getKillLocations function
    const killLocations = await getKills();

    // Fetch details for each kill location and store them in an array
    const locationsWithDetails = await Promise.all(
      killLocations.map(async (killLocation) => {
        // Check if the location ID is valid (not null)
        if (killLocation && killLocation.locationId !== null) {
          try {
            // Fetch the location details for this kill location
            const location = await getLocationById(killLocation.locationId);
            return {
              location,
            };
          } catch (error) {
            // Log an error if there was an issue fetching location details
            console.error("Failed to fetch location details:", error);
            // Also log the kill location that caused the error
            console.error("Error occurred for killLocation:", killLocation);
            return null; // Return null for failed locations
          }
        } else {
          // Log a warning for invalid or missing location IDs
          console.warn(
            "Invalid or missing location ID. Skipping entry:",
            killLocation
          );
          // Also log the kill location that was skipped
          console.error("Error occurred for killLocation:", killLocation);
          return null; // Return null for invalid or missing location IDs
        }
      })
    );

    // Filter out null values (failed locations) from the results
    const filteredLocationsWithDetails = locationsWithDetails.filter(
      (location) => location !== null
    );

    return filteredLocationsWithDetails;
  } catch (error) {
    // If there's an error at any point in the process, throw an error
    throw new Error("Failed to fetch kill locations with details");
  }
};
