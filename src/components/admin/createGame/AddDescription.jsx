import React from "react";
import InputField from "../../common/InputField";
const AddDescription = ({ gameFormData, handleInputChange }) => {

  return (
    <div className="  w-full xl:w-3/4 mx-auto p-5 rounded-lg ">
      <h1 className="text-lg md:text-2xl font-bold text-center row-span-1">Step 1:</h1>
      <h2 className="text-lg md:text-2xl font-semibold text-center">Title and description</h2>
      <label className="block text-base">Title of game:</label>
      <input
        type="text"
        name="title"
        value={gameFormData.title}
        onChange={handleInputChange}
        className="rounded-lg bg-white text-gray-900 focus:ring-0 block flex-1 min-w-0 w-full text-sm p-2.5 focus:outline-none"
      />

      <label className="block text-base">Add Description:</label>
      <textarea
        type="text"
        name="description"
        value={gameFormData.description}
        onChange={handleInputChange}
        className="rounded-lg bg-white text-gray-900 focus:ring-0 block flex-1 min-w-0 w-full text-sm p-2.5 focus:outline-none"
      />

    </div>
  );
};

export default AddDescription;
