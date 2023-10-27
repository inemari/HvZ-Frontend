import createCrudService from "../ICrudService";
import api from "../axios";

// service for managing user data.
const userService = createCrudService("AppUser");

// Check if a user exists using an API call.
export const checkUserExistence = async () => {
    try {
      const response = await api.get('/AppUser/exists');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // User not found, return null or any appropriate value
        return null;
      }
      // For other errors, you can re-throw the error or handle it as needed.
      throw error;
    }
}

// Check if a user exists, and create one if not.
export const checkIfExists = async () => {
  try {
      const user = await checkUserExistence();
      if (user === null) {
        // If the user doesn't exist, create a new user.
          const user = await createUser();
          return user;
      } else {
          return user;
      }
  } catch (error) {
      throw error;
  }
}
// Create a new user using an API call.
export const createUser = async () => {
  try {
    const response = await api.post('/AppUser/register');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default userService;