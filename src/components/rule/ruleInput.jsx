import React, { useState } from "react";
import InputAdmin from "../common/CustomInput";
import CustomButton from "../common/CustomButton";

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
    <div className="grid grid-flow-row gap-3 ">
      <h1 className="text-3xl md:text-4xl font-bold mt-2 pr-3 text-center ">Add rule</h1>
      <InputAdmin
        label="Rule title"
        textComponent="input"
        type="text"
        fieldname="title"
        field={ruleFormData.title}
        onChange={handleInputChange}
        id="title"
        TooltipContent={"The title or name of this rule."}
        required />

      <InputAdmin
        label="Rule description"
        textComponent="textarea"
        type="text"
        fieldname="description"
        field={ruleFormData.description}
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
