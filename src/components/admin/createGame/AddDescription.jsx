import React from "react";

const AddDescription = ({ formData, handleInputChange }) => {

  return (
    <div>
      <form>
        <div className="mb-4">
          <label className="block text-base">Add Description:</label>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-2/3 border rounded py-2 px-3 text-black"
          />
        </div>
      </form>
    </div>
  );
};

export default AddDescription;