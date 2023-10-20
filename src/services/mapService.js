// mapService.js
import api from './api';

export const getMission = async (id) => {
    try {
        const response = await api.get(`/Mission/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch missions');
    }
};

export const getLocation = async (id) => {
    try {
        const response = await api.get(`/Location/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch mission locations');
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
        throw new Error('Failed to fetch mission details');
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
        throw new Error('Failed to add coordinate to mission');
    }
};

export const createMission = async (missionData) => {
    try {
        const response = await api.post(`/Mission`, missionData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create a new mission');
    }
};
export const createLocation = async (locationData) => {
    try {
      const response = await api.post(`/Location`, locationData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create a new location');
    }
  };