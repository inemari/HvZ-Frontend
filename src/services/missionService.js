import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const postMission = async (missionData) => {
  try {
    const response = await api.post("/mission", missionData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Failed to post Mission:", error.response.data);
    }
    throw error;
  }
};

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

export const useFetchGameMissions = (missionIds) => {
  const [gameMissions, setGameMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const missions = await getGameMissions(missionIds);
        setGameMissions(missions);
      } catch (error) {
        console.error("Error fetching missions", error);
      }
    };
    fetchMissions();
  }, []);

  return gameMissions;
};
