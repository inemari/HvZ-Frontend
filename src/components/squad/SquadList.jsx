import React, { useEffect, useState } from "react";
import { fetchSquadsByGameId } from "../../services/squadService";
import { useNavigate } from "react-router-dom";

// SquadList component for displaying a list of squads
const SquadList = ({ squadListUpdated }) => {
  const [squads, setSquads] = useState([]); 
  const navigate = useNavigate();
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const selectedGameId = selectedGame.id;
  
  // Use an effect to fetch squad data when the component mounts or squadListUpdated changes
  useEffect(() => {
    const fetchSquadsData = async () => {
      try {
        // Fetch squads data based on the selected game
        const squadsData = await fetchSquadsByGameId(selectedGameId);
        setSquads(squadsData);
      } catch (error) {
        console.error("Error fetching squads:", error);
      }
    };

      // Call the fetchSquadsData function
      fetchSquadsData();
  }, [squadListUpdated, selectedGameId]);
  
  // Handle the selection of a squad and navigate to SquadDetails
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
