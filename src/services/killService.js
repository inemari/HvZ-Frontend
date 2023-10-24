import api from './api';

export const getKills = async () => {
    try {
      const response = await api.get(`/Kill/GetKills`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch kill locations');
    }
  };