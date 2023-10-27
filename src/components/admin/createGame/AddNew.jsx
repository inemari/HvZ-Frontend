import React from "react";
import add from "../../../assets/ui/add.png";

// NewGameBtn component displays a button with an icon and a label.
// Props:
// - label: The label text for the button.
// - action: The function to be executed when the button is clicked.
const NewGameBtn = ({ label, action }) => {
  return (
    // Render a button with an icon and a label. When clicked, the 'action' function is executed.
    <button
      className="bg-white bg-opacity-25 justify-center flex-row flex p-5 rounded-lg gap-3 hover:bg-opacity-40 font-bold"
      onClick={action}
    >
      <img src={add} alt="add icon" className="h-7 w-7" />
      {label}
    </button>
  );
};

export default NewGameBtn;
