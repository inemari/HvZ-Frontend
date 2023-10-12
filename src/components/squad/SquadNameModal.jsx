import React, { useState } from 'react';
import CustomButton from '../common/CustomButton';
import InputField from '../common/InputField'; 
import squadService from '../../services/squadService';

const SquadNameModal = ({ onClose }) => {
    const [squadName, setSquadName] = useState('');
    const [error, setError] = useState('');
    const [isSquadCreated, setIsSquadCreated] = useState(false); // State to track squad creation

    const handleSubmit = async () => {
        // Check if the squad name is not empty
        if (squadName.trim() === '') {
            setError('Squad name is required.');
        } else {
            try {
                // Use the createNewSquad function from squadService
                await squadService.createNewSquad(squadName);
    
                // Update the state to indicate that the squad has been created
                setIsSquadCreated(true);
            } catch (error) {
                setError('Failed to create squad');
            }
        }
    };

    return (
        <div className="w-full max-w-md p-6 text-center">
            <h2 className="text-xl font-medium mb-4 text-white">Create a new squad:</h2>
            <InputField
                error={error}
                value={squadName}
                onChange={(value) => setSquadName(value)}
                showIcon={true}
                iconPath="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                placeholder="Enter squad name"
            />

            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <div className="mt-4">
                {isSquadCreated ? (
                    <div>
                        <p className="text-green-500 text-xs font-bold">Squad has been created!</p>
                        <CustomButton type="button" label={"Close"} onClick={onClose} />
                    </div>
                ) : (
                    <CustomButton type="submit" label={"Create Squad"} onClick={handleSubmit} />
                )}
            </div>
        </div>
    );
};

export default SquadNameModal;
