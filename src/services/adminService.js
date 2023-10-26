import gameService, { addMissionToGame, addRuleToGame } from "../api/services/gameService";
import missionService, { addLocationToMission } from "../api/services/missionService";
import ruleService from "../api/services/ruleService";
import locationService from "../api/services/locationService";
import { useNavigate } from "react-router-dom";

export const createGame = async (gameData, missions, rules, locations) => {
  try {
    // Step 1: Create the game
    const gameResponse = await gameService.add(gameData);

    if (gameResponse && gameResponse.id) {
      const gameId = gameResponse.id;

      // Step 2: Create missions
      const missionIds = [];
      for (const missionData of missions) {
        try {
          const response = await missionService.add(missionData);
          if (response && response.id) {
            missionIds.push(response.id);
          } else {
            console.error("Failed to get mission ID");
          }
        } catch (error) {
          console.error("Failed to post mission:", error);
        }
      }

      // Step 3: Create rules
      const ruleIds = [];
      for (const ruleData of rules) {
        try {
          const response = await ruleService.add(ruleData);
          if (response && response.id) {
            ruleIds.push(response.id);
          } else {
            console.error("Failed to get rule ID");
          }
        } catch (error) {
          console.error("Failed to add rule:", error);
        }
      }

      // Step 4: Create locations and associate them with missions
      for (let i = 0; i < locations.length; i++) {
        const locationData = locations[i];
        try {
          const response = await locationService.add(locationData);
          if (response && response.id) {
            const locationId = response.id;

            // Associate the location with the corresponding mission
            if (i < missionIds.length) {
              addLocationToMission(missionIds[i], locationId);
            } else {
              console.error(
                "Failed to associate location with a mission: No corresponding mission found"
              );
            }
          } else {
            console.error("Failed to get location ID");
          }
        } catch (error) {
          console.error("Failed to add location:", error);
        }
      }

      // Step 4: Associate missions and rules with the game
      for (const missionId of missionIds) {
        addMissionToGame(gameId, missionId);
      }

      for (const ruleId of ruleIds) {
        addRuleToGame(gameId, ruleId);
      }

      return gameId;
    } else {
      console.error("Failed to create the game");
      return null;
    }
  } catch (error) {
    console.error("Failed to create the game:", error);
    return null;
  }
};

export const setEditGame = (game, navigate) => {
  // Save game information to localStorage when a game is clicked
  localStorage.setItem('selectedGame', JSON.stringify(game));
  navigate('/EditGame');
};
