import { useState, useEffect } from "react";
import api from "./api"; 

// Function to post a new rule
export const postRule = async (ruleData) => {
  try {
    // Send a POST request to create a new rule
    const response = await api.post(`/Rules`, ruleData);
    return response.data;
  } catch (error) {
     // Throw an error to indicate the failure to post a new rule
    throw new Error("Failed to post a new rule");
  }
};

// Custom hook to fetch game rules by ruleIds
export const useFetchGameRules = (ruleIds) => {
  const [gameRules, setGameRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const rules = await fetchGameRulesByIds(ruleIds);
        setGameRules(rules);
      } catch (error) {
        console.error("Error fetching rules", error);
      }
    };
    fetchRules();
  }, []);

  return gameRules;
};

// Function to fetch game rules by an array of ruleIds
export const fetchGameRulesByIds = async (ruleIds) => {
  try {
    const rules = [];

    for (const ruleId of ruleIds) {
      // Send a GET request for each ruleId to retrieve rule data
      const response = await api.get(`/rules/${ruleId}`);
      rules.push(response.data);
    }

    return rules;
  } catch (error) {
    // Log an error message if there's an issue fetching rules
    console.error("Error fetching rules", error);
    throw error;
  }
};
