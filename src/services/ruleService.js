/* // ruleService.js

import { useState, useEffect } from "react";
import api from "./api"; // Assuming you have an api.js file defining the axios instance

export const postRule = async (ruleData) => {
  try {
    const response = await api.post(`/Rules`, ruleData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to post a new rule");
  }
};

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

export const fetchGameRulesByIds = async (ruleIds) => {
  try {
    const rules = [];

    for (const ruleId of ruleIds) {
      const response = await api.get(`/rules/${ruleId}`);
      rules.push(response.data);
    }

    return rules;
  } catch (error) {
    console.error("Error fetching rules", error);
    throw error;
  }
};
 */