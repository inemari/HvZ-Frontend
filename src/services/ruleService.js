import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const postRule = async (ruleData) => {
  try {
    const response = await api.post("/rules", ruleData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Log the response data for debugging
      console.error("Failed to post Rule:", error.response.data);
    }
    throw error;
  }
};
// Function to fetch rules
export async function fetchGameRules(ruleIds) {
  try {
    const rules = [];

    for (const ruleId of ruleIds) {
      const response = await api.get(`/Rules/${ruleId}`);
      rules.push(response.data);
    }

    return rules;
  } catch (error) {
    console.error('Error fetching rules', error);
    throw error;
  }
}