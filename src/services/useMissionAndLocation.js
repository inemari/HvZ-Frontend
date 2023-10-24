import api from './api';

// Function to get mission details by ID
const getMissionById = async (id) => {
    try {
        const response = await api.get(`/Mission/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get location details by ID
const getLocationById = async (id) => {
    try {
        const response = await api.get(`/Location/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Function to get coordinates for a mission by its ID
const getCoordinatesByMissionId = async (id) => {
    try {
        // Get mission details by ID
        const mission = await getMissionById(id);
        const locationIds = mission.locationIds || [];

        const coordinates = [];

        for (const locationId of locationIds) {
            // Get location details by ID
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
