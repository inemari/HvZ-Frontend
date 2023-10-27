import api from "./axios.js";
import keycloak from "../Keycloak";

// Function to create a CRUD service for a specific API endpoint.
const createCrudService = (endpoint) => {
  return {
      // Add data to the specified endpoint using an API POST request.
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
        throw error; // Re-throw the error for higher-level handling
      }
    },
 // Retrieve all data from the specified endpoint using an API GET request.
    getAll: async () => {
      try {
        const response = await api.get(`/${endpoint}`);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error(`Failed to get all ${endpoint}s:`, error.response.data);
        }
        throw error; // Re-throw the error for higher-level handling.
      }
    },

    // Retrieve data by ID from the specified endpoint using an API GET request.
    getById: async (id) => {
      try {
        const response = await api.get(`/${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error(`Failed to get ${endpoint}:`, error.response.data);
        }
        throw error; // Re-throw the error for higher-level handling.
      }
    },
  
    // Update data by ID at the specified endpoint using an API PUT request.
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
        throw error; // Re-throw the error for higher-level handling.
      }
    },
  
    // Delete data by ID from the specified endpoint using an API DELETE request.
    deleteById: async (id) => {
      try {
        const response = await api.delete(`/${endpoint}/${id}`);
        return response.data;
      } catch (error) {
        if (error.response) {
          console.error(`Failed to delete ${endpoint}:`, error.response.data);
        }
        throw error; // Re-throw the error for higher-level handling.
      }
    },
  };
};

export default createCrudService;
