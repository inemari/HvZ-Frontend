import React, { useState } from 'react';
import SquadNameModal from './SquadNameModal';

const SquadCreate = ({ onSquadCreated }) => {
   // State to track whether the squad is created
    const [isSquadCreated, setIsSquadCreated] = useState(false);
  
    // Handler to reset the squad creation status
    const handleResetSquadCreation = () => {
      // Reset the squad creation status and notify the parent component
      setIsSquadCreated(false);
      onSquadCreated();
    };
  
    return (
      <div className="bg-black bg-opacity-60 text-white rounded-lg p-4">
        <h2 className="text-2xl font-bold">Create Squad</h2>
        {isSquadCreated ? (
           // Render squad creation success message
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Squad Created</h3>
            <p>Your squad has been created successfully!</p>
            <button
              type="button"
              onClick={handleResetSquadCreation}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2 transition duration-300"
            >
              Create Another Squad
            </button>
          </div>
        ) : (
          // Render the SquadNameModal for squad creation
          <SquadNameModal
              onSquadCreated={onSquadCreated}
              setIsSquadCreated={setIsSquadCreated}
            onSquadCreationError={(error) => console.error('Error creating squad:', error)}
          />
        )}
      </div>
    );
  };
  export default SquadCreate;
