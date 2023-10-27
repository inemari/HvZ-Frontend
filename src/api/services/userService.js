import createCrudService from "../ICrudService";
import api from "../axios";

const userService = createCrudService("AppUser");

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


export const checkIfExists = async () => {
  try {
      const user = await checkUserExistence();
      if (user === null) {
          const user = await createUser();
          return user;
      } else {
          return user;
      }
  } catch (error) {
      throw error;
  }
}

export const createUser = async () => {
  try {
    const response = await api.post('/AppUser/register');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default userService;