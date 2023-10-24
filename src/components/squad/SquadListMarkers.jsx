import React, { useEffect, useState, useRef } from "react";
import { fetchPlayerLocationsForGame } from "../../services/mapService";
import SquadMarker from "./SquadMarker";
import { useKeycloak } from "@react-keycloak/web";
import { useLocationContext } from "../../LocationContext";
import { getGame } from "../../services/gameService";

// Component to render SquadMarkers for players
const SquadListMarkers = ({ rerenderMap }) => {
  const { locationHubConnection } = useLocationContext();
  const [playerData, setPlayerData] = useState([]);
  const { keycloak, initialized } = useKeycloak();
  const [game, setGame] = useState(null);
  const previousPlayerDataRef = useRef([]);
  const [loading, setLoading] = useState(false);
  
   // Fetch player data for the game
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Retrieve the selected game from local storage
      const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));

      // Fetch game data for the selected game
      const gameData = await getGame(selectedGame.id);
      setGame(gameData);
      const playerIds = gameData.playerIds;

      try {
        // Fetch new player data for the game
        const newPlayerData = await fetchPlayerLocationsForGame(playerIds);
        setPlayerData(newPlayerData);
      } catch (error) {
        console.error("Error fetching player data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [rerenderMap]);

  // Store the previous data in a ref
  useEffect(() => {
    previousPlayerDataRef.current = playerData;
  }, [playerData]);

  // Initialize currentData with an empty array to avoid 'undefined' errors
  const currentData = loading
    ? previousPlayerDataRef.current
    : playerData || [];

  return (
    <ul>
      {sessionStorage.getItem("joinedSquadId") !== "" &&
      currentData.length > 0 ? (
        currentData.map((player) => (
          <li key={player.id}>
            <SquadMarker playerId={player.id} />
          </li>
        ))
      ) : (
        <p></p>
      )}
    </ul>
  );
};

export default SquadListMarkers;