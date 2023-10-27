import { useEffect, useState } from "react";
import createCrudService from "../ICrudService";
import api from "../axios";

// service for managing rule data.
const ruleService = createCrudService("Rule");

// Fetch game rules by their IDs using an API call.
  export const fetchGameRulesByIds = async (ruleIds) => {
    try {
      const rules = [];
        for (const ruleId of ruleIds) {
        // Retrieve rule data for each rule ID.
        const response = await   api.get(`/rule/${ruleId}`);
        rules.push(response.data);
      }
  
      return rules;
    } catch (error) {
      console.error("Error fetching rules", error);
      throw error;
    }
};

// Custom React hook for fetching game rules and managing component state.
export const useFetchGameRules = (ruleIds) => {
    const [gameRules, setGameRules] = useState([]);
  
    useEffect(() => {
      // asynchronous function to fetch game rules when the component mounts.
      const fetchRules = async () => {
        try {
          const rules = await fetchGameRulesByIds(ruleIds);
          setGameRules(rules);
        } catch (error) {
          console.error("Error fetching rules", error);
        }
      };
      // Call the fetchRules function when the component mounts (empty dependency array []).
      fetchRules();
    }, []);
  
    // Return the fetched game rules to the component.
    return gameRules;
  };

export default ruleService;