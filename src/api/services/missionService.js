import createCrudService from "../ICrudService";
import api from "../axios";

const missionService = createCrudService("Mission");

export const addMission = async (missionData) => {
    missionService.add(missionData)
  };

export const getAllMissions = async () => {
    missionService.getAll()
};

export const getMissionById = async (missionId) => {
    missionService.getById(missionId)
};

export const updateMissionById = async (missionId, updatedMissionData) => {
    missionService.updateById(missionId, updatedMissionData)
};

export const deleteMissionById = async (missionId) => {
    missionService.deleteById(missionId)
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
  
  
export default missionService;