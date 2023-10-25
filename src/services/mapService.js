import api from "../api/axios";
import playerService from "../api/services/playerService";
import locationService from "../api/services/locationService";

export const fetchMissionsForGame = async (missionIds) => {
  try {
    const missionData = [];
    console.log("Fetch missions:", missionIds);
    for (const id of missionIds) {
      const response = await api  .get(`/Mission/${id}`);
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
