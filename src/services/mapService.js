// mapService.js
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL; // Replace with your API URL

export const getMission = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/Mission/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch missions');
    }
};

export const fetchMissionsForGame = async (missionIds) => {
    try {
      const missionData = [];
  
      for (const id of missionIds) {
        const response = await axios.get(`${BASE_URL}/Mission/${id}`);
        const mission = response.data;
        const locationResponse = await axios.get(`${BASE_URL}/Location/${mission.locationId}`);
        const location = locationResponse.data;
        mission.location = location;
        missionData.push(mission);
      }
  
      return missionData;
    } catch (error) {
      throw new Error('Failed to fetch mission details');
    }
  };
  
export const getMissionLocations = async (missionIds) => {
    const locationData = [];

    for (const missionId of missionIds) {
        try {
            // Fetch the mission details
            const mission = await getMission(missionId);

            // Fetch the location details using the mission's locationId
            const location = await getLocation(mission.locationId);

            // Add both mission and location data to the result
            locationData.push({
                mission,
                location,
            });
        } catch (error) {
            console.error('Failed to fetch mission or location:', error);
        }
    }

    return locationData;
};

export const getLocation = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/Location/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch mission locations');
    }
};