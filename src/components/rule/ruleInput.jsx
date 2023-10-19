import React, { useState } from "react";

const RuleInput = ({ onAddRule, closeModal }) => {
  const ruleEntity = {
    title: "",
    description: "",
  };
  const [ruleFormData, setRuleFormData] = useState(ruleEntity);

  const handleInputChange = (e) => {
    const updatedFormData = { ...ruleFormData };
    updatedFormData[e.target.name] = e.target.value;
    setRuleFormData(updatedFormData);
  };

  const handleAddRule = () => {
    // Create a rule object using ruleFormData
    const ruleData = { ...ruleFormData };

    // Notify the parent component that a rule has been added
    onAddRule(ruleData);

    // Close the modal and reset the form
    closeModal();
    setRuleFormData(ruleEntity); // Reset to initial state
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block font-semibold">Rule Title:</label>
        <input
          type="text"
          name="title"
          value={ruleFormData.title}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label className="block font-semibold">Rule Description:</label>
        <input
          type="text"
          name="description"
          value={ruleFormData.description}
          className="w-2/3 border rounded py-2 px-3 text-black"
          onChange={handleInputChange}
        />
      </div>
      <button
        className="bg-blue-500 text-white rounded p-2 text-sm hover-bg-blue-600 cursor-pointer"
        onClick={handleAddRule}
      >
        Submit Rule
      </button>
    </div>
  );
};

export default RuleInput;
