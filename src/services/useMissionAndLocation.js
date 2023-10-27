// services/useMissionAndLocation.js
import api from './api';


// Function to fetch mission details by ID.
const getMissionById = async (id) => {
    try {
        // Send a GET request to retrieve mission details.
        const response = await api.get(`/Mission/${id}`);
        return response.data;
    } catch (error) {

        // Handle and rethrow any errors that occur during the request.
        throw error;
    }
};
// Function to fetch location details by ID.
const getLocationById = async (id) => {
    try {
         // Send a GET request to retrieve location details.
        const response = await api.get(`/Location/${id}`);
        return response.data;
    } catch (error) {
// Handle and rethrow any errors that occur during the request.
        throw error;
    }
};

// Function to fetch coordinates for a mission by ID.
const getCoordinatesByMissionId = async (id) => {
    // Fetch mission details by ID.
    try {
        const mission = await getMissionById(id);
        // Extract location IDs from mission data.
        const locationIds = mission.locationIds || [];

        const coordinates = [];
// Loop through location IDs and fetch corresponding location details.
        for (const locationId of locationIds) {
            const locationResponse = await getLocationById(locationId);
            coordinates.push({
                xCoordinate: locationResponse.xcoordinate,
                yCoordinate: locationResponse.ycoordinate,
            });
        }
// Return an array of coordinates for the mission's locations.
        return coordinates;
    } catch (error) {
        throw error;
    }
};

export { getCoordinatesByMissionId, getMissionById };
