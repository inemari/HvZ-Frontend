import React, { useEffect, useState, useRef } from "react";
import { fetchPlayerLocationsForGame } from "../../services/mapService";
import SquadMarker from "./SquadMarker";
import gameService from "../../api/services/gameService";

// The component responsible for rendering markers on the map for squad members.
const SquadListMarkers = ({ rerenderMap }) => {
  const [playerData, setPlayerData] = useState([]);
  const previousPlayerDataRef = useRef([]);
  const [loading, setLoading] = useState(false);

  // useEffect to fetch player and game data when 'rerenderMap' changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
       // Retrieve the selected game from local storage
      const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));

      // Fetch detailed game data by calling 'gameService.getById' with the game's ID
      const gameData = await gameService.getById(selectedGame.id);
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