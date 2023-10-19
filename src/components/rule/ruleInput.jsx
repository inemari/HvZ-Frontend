import React, { useState } from 'react';
import { postRule } from '../../services/ruleService';

const RuleInput = ({ onAddRule, closeModal }) => {
  const [ruleTitle, setRuleTitle] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');

  // Handler for submitting the rule
  const handleSubmitRule = () => {
    // Create a rule object
    const ruleData = {
      title: ruleTitle,
      description: ruleDescription,
    };

    // Notify the parent component that a rule has been added
    onAddRule(ruleData); // Pass the rule data to the parent

    // Close the modal after successfully creating the rule
    closeModal();
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block font-semibold">Rule Title:</label>
        <input
          type="text"
          value={ruleTitle}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={(e) => setRuleTitle(e.target.value)}
        />
      </div>
      <div>
        <label className="block font-semibold">Rule Description:</label>
        <input
          type="text"
          value={ruleDescription}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={(e) => setRuleDescription(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white rounded p-2 text-sm hover-bg-blue-600 cursor-pointer"
        onClick={handleSubmitRule}
      >
        Submit Rule
      </button>
    </div>
  );
};

export default RuleInput;

