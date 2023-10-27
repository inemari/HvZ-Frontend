import React, { useState } from "react";
import InputAdmin from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

// Allows users to input data for creating a game rule
const RuleInput = ({ onAddRule, closeModal }) => {
  // Define a rule entity with default empty values
  const ruleEntity = {
    title: "",
    description: "",
  };

   // State to manage the form data for creating a new rule
  const [ruleFormData, setRuleFormData] = useState(ruleEntity);

   // Handle user input changes for rule title and description
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
  
    setRuleFormData(ruleEntity); // Reset to initial state
    closeModal();
  };

  return (
    <div className="grid grid-flow-row gap-3 ">
      <h1 className="text-3xl md:text-4xl font-bold mt-2 pr-3 text-center ">Add rule</h1>
      <InputAdmin
        label="Rule title"
        textComponent="input"
        type="text"
        fieldname="title"
        value={ruleFormData.title}
        onChange={handleInputChange}
        id="title"
        TooltipContent={"The title or name of this rule."}
        required />

      <InputAdmin
        label="Rule description"
        textComponent="textarea"
        type="text"
        fieldname="description"
        value={ruleFormData.description}
        onChange={handleInputChange}
        id="description"
        TooltipContent="Enter a clear and concise description of the rule. This will help users understand the rule's purpose and how to adhere to it. Make sure to provide all necessary details."
        required />

      <CustomButton
        onClick={handleAddRule}
        label="   Submit Rule"
      />
    </div>
  );
};

export default RuleInput;
