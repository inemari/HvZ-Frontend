import api from "./axios.js";
import keycloak from "../Keycloak";

const createCrudService = (endpoint) => {
  return {
    add: async (data) => {
      try {
        const response = await api.post(`/${endpoint}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error(`Failed to add ${endpoint}:`, error.response.data);
        }
        throw error;
      }
    },

    getAll: async () => {
      try {
        const response = await api.get(`/${endpoint}`);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error(`Failed to get all ${endpoint}s:`, error.response.data);
        }
        throw error;
      }
    },

    getById: async (id) => {
      try {
        const response = await api.get(`/${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error(`Failed to get ${endpoint}:`, error.response.data);
        }
        throw error;
      }
    },

    updateById: async (id, data) => {
      try {
        const response = await api.put(`/${endpoint}/${id}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error(`Failed to update ${endpoint}:`, error.response.data);
        }
        throw error;
      }
    },

    deleteById: async (id) => {
      try {
        const response = await api.delete(`/${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error(`Failed to delete ${endpoint}:`, error.response.data);
        }
        throw error;
      }
    },
  };
};

export default createCrudService;
