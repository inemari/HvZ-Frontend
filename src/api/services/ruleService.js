import { useEffect, useState } from "react";
import createCrudService from "../ICrudService";
import api from "../axios";

const ruleService = createCrudService("Rule");

  export const fetchGameRulesByIds = async (ruleIds) => {
    try {
      const rules = [];
  //console.log("ruuules", ruleIds)
        for (const ruleId of ruleIds) {
            console.log("ruuules", ruleId)
        const response = await   api.get(`/rule/${ruleId}`);
        rules.push(response.data);
      }
  
      return rules;
    } catch (error) {
      console.error("Error fetching rules", error);
      throw error;
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

export default ruleService;