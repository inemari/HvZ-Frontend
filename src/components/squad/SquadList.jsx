import React, { useEffect, useState } from 'react';
import { getSquads } from '../../services/squadService';

const SquadList = () => {
  const [squads, setSquads] = useState([]);

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

  return (
    <div className="bg-black bg-opacity-60 text-white rounded-lg p-4">
      <h2 className="text-2xl font-bold">Squads</h2>
      <ul>
        {squads.map((squad) => (
          <li key={squad.id}>
            <p className="font-semibold">{squad.squadName}</p>
            <p>Total Members: {squad.numberOfMembers}</p>
            <p>Deceased Members: {squad.numberOfDeceased}</p>
            <hr></hr>
            <br></br>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SquadList;
