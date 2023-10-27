import React, { useEffect, useState } from "react";
import { fetchSquadsByGameId } from "../../api/services/squadService";
import { useNavigate } from "react-router-dom";

const SquadList = ({ squadListUpdated }) => {
  const [squads, setSquads] = useState([]);
  const navigate = useNavigate();
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const selectedGameId = selectedGame.id;

  // This useEffect is responsible for fetching data about squads based on the selected game ID
  useEffect(() => {
     // Define an asynchronous function 'fetchSquadsData' to fetch squads data
    const fetchSquadsData = async () => {
      try {
        // Attempt to fetch squads data by calling 'fetchSquadsByGameId' with the selected game ID
        const squadsData = await fetchSquadsByGameId(selectedGameId);

        // Update the state variable 'squads' with the retrieved data
        setSquads(squadsData);
      } catch (error) {
        console.error("Error fetching squads:", error);
      }
    };

      fetchSquadsData();
    
  }, [squadListUpdated, selectedGameId]);

  const handleSquadSelect = (squadId) => {
    sessionStorage.setItem("selectedSquadId", squadId); // Store the selected squad's ID
    navigate("/SquadDetails"); // Navigate to the SquadDetails page
  };

  return (
    <div className="bg-black bg-opacity-60 text-white rounded-lg p-4" style={{ overflow: 'auto', maxHeight: '70vh' }}>
      <h2 className="text-2xl font-bold">Squads</h2>
      <ul>
        {squads.map((squad) => (
          <li key={squad.id}>
            <p className="font-semibold">{squad.squadName}</p>
            <p>Total Members: {squad.numberOfMembers}</p>
            <p>Deceased Members: {squad.numberOfDeceased}</p>
            <button
              onClick={() => handleSquadSelect(squad.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2 transition duration-300"
            >
              Squad Details
            </button>
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SquadList;
