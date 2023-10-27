import React from "react";
import gravestone from "../../assets/icons/gravestone1.png";

const MarkerInfo = () => {
  return (
    <div className="bg-black-800 bg-opacity-80 p-1 rounded-lg left-2 right-2 z-10 text-white grid grid-flow-2">
      <h3 className="text-lg font-bold  mb-2">Markers</h3>
      <div className="text-left space-x-10 flex flex-row">
        <div className="mb-1 flex flex-row">
          <div className="w-8 h-8 bg-red-500 aspect-square text-center  p-1 rounded-full">
            M1
          </div>
          <p className="ml-2">= Mission</p>
        </div>

        <div className=" mb-1  flex flex-row">
          <img src={gravestone} alt="Gravestone-icon" className="h-8 w-8" />
          <p className="ml-2">= Player has been killed</p>
        </div>
      </div> <p className="grid col-span-full">Click a marker to read more!</p>
    </div>
  );
};

export default MarkerInfo;
