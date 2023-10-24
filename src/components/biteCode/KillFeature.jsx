// KillFeature.js
import React, { useState } from 'react';
import InputField from '../common/InputField';
import CustomButton from '../common/CustomButton';
import useKillFeature, { getKill } from '../../services/useKillFeature';

const KillFeature = () => {
  const {
    bitecode,
    error,
    isKilled,
    setBitecode,
    handleKill,
    killInfo, // Add killInfo from useKillFeature
  } = useKillFeature();







  return (
    <div className="w-full max-w-md p-6 text-center">
      <h2 className="text-xl font-medium mb-4 text-white">Enter bitecode to turn human into a zombie:</h2>
      <InputField
        label="Enter bitecode"
        error={error}
        value={bitecode}
        onChange={(value) => setBitecode(value)}
        showIcon={true}
        iconPath="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
        placeholder="Enter the bitecode"
      />
      {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
      <div className="mt-4">
        <CustomButton
          label={isKilled ? "Killed" : "Kill"}
          className={`bg-blue-500 ${isKilled ? 'bg-blue-700' : 'hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded`}
          onClick={() => handleKill(bitecode)}
          disabled={isKilled}
        >
          {isKilled ? "Killed" : "Kill"}
        </CustomButton>
        {isKilled && (
          <p>
            Player with id: {killInfo.id} killed at {killInfo.timeOfKill}
          </p>
        )}
      </div>
    </div>
  );
};

export default KillFeature;
