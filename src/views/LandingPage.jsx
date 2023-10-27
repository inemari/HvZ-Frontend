import clearSessionStorageData from "../helpers/SessionStorageUtils";
import React, { useState } from "react";
import Games from "../components/game/Games"; 
import GameTabs from "../components/game/GameTabs";
import Container from "../components/common/Container";

// Component that serves as the entry point for the application.
const LandingPage = () => {
  clearSessionStorageData();

  // Initialize the 'activeTab' state variable to manage the currently active tab.
  const [activeTab, setActiveTab] = useState("Registration");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <>
      <GameTabs activeTab={activeTab} handleTabChange={handleTabChange} />
      <Container>
        <Games activeTab={activeTab} />
      </Container>
    </>
  );
};

export default LandingPage;
