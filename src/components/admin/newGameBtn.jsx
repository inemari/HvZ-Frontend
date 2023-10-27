import React from "react";
import CustomButton from "../common/CustomButton";
import add from "../../assets/ui/add.png";
import { useNavigate } from "react-router-dom";

const NewGameBtn = () => {
  const navigate = useNavigate();
  
  return (
    <div className="h-fit  z-20 w-full m-auto">
      <CustomButton
        className=""
        label={"Create new game"}
        icon={add}
        rounded="3xl"
        iconPosition={"before"}
        onClick={() => navigate("/CreateGame")}
      />
    </div>
  );
};

export default NewGameBtn;
