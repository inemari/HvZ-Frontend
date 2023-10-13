import React, { useEffect, useState } from 'react';
import { getSquads } from '../../services/squadService';
import { useNavigate } from 'react-router-dom';

const SquadList = () => {
  const [squads, setSquads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSquadsData = async () => {
      try {
        const squadsData = await getSquads();
        setSquads(squadsData);
      } catch (error) {
        console.error('Error fetching squads:', error);
      }
    };

    fetchSquadsData();
  }, []);

  const handleSquadSelect = (squadId) => {
    localStorage.setItem('selectedSquadId', squadId); // Store the selected squad's ID
    navigate('/SquadDetails'); // Navigate to the SquadDetails page
  };

  return (
    <div className="bg-black bg-opacity-60 text-white rounded-lg p-4">
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
