import { useEffect, useState } from "react";
import createCrudService from "../ICrudService";
import api from "../axios";

const missionService = createCrudService("Mission");


export const addLocationToMission = async (missionId, locationId) => {
    try {
      const response = await api.put(
        `/mission/${missionId}/add-location/${locationId}`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("'Failed to add location to mission'", error.response.data);
      }
      throw new Error("Failed to add location to mission");
    }
};
  
export const getGameMissions = async (missionIds) => {
  try {
    const missions = [];
    for (const missionId of missionIds) {
      const response = await api.get(`/Mission/${missionId}`);
      missions.push(response.data);
    }
    return missions;
  } catch (error) {
    throw new Error("Failed to get missions.");
  }
};

export const useFetchGameMissions = (ruleIds) => {
  const [gameMissions, setGameMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const missions = await getGameMissions(ruleIds);
        setGameMissions(missions);
      } catch (error) {
        console.error("Error fetching rules", error);
      }
    };
    fetchMissions();
  }, []);

  return gameMissions;
};

  
export default missionService;