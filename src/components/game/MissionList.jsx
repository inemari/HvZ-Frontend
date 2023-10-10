import React from 'react';

const MissionList = ({ missions }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Missions</h2>
      <ul className="list-disc pl-4">
        {missions.map((mission) => (
          <li key={mission.id}>
            <h3 className="text-xl font-medium">{mission.name}</h3>
            <p className="text-gray-600">{mission.description}</p>
            {/* Add more mission details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MissionList;
