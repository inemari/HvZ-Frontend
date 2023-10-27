import axios from 'axios';
import keycloak from '../Keycloak';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // setting base URL for API requests.
});

// Intercept and modify the request configuration before sending it.
api.interceptors.request.use((config) => {
  const token = keycloak.token;
  if (token) {
     // Add the Keycloak token to the request headers for authorization.
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api