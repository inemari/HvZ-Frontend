// services/useMissionAndLocation.js
import api from './api';

const getMissionById = async (id) => {
    try {
        const response = await api.get(`/Mission/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getLocationById = async (id) => {
    try {
        const response = await api.get(`/Location/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCoordinatesByMissionId = async (id) => {
    try {
        const mission = await getMissionById(id);
        const locationIds = mission.locationIds || [];

        const coordinates = [];

        for (const locationId of locationIds) {
            const locationResponse = await getLocationById(locationId);
            coordinates.push({
                xCoordinate: locationResponse.xcoordinate,
                yCoordinate: locationResponse.ycoordinate,
            });
        }

        return coordinates;
    } catch (error) {
        throw error;
    }
};

export { getCoordinatesByMissionId, getMissionById };
