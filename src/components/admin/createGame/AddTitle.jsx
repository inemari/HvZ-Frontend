import React from "react";
import InputField from "../../common/InputField";

const AddTitle = ({ gameFormData, handleInputChange }) => {
  return (
    <div>
      <form>
        <div className="mb-4">
          {/* <label className="block text-base">Title of game:</label>
          <input
            type="text"
            name="title"
            value={gameFormData.title}
            onChange={handleInputChange}
            className="w-1/3 border rounded py-2 px-3 text-black"
          /> */}
        </div>
      </form>
    </div>
  );
};

export default AddTitle;


{/* <InputField
error={error}
value={formData.title}
onChange={handleInputChange}
showIcon={true}
iconPath="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
placeholder="Enter game title"
/> */}