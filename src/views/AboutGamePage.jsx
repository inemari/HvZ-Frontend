// AboutGame.js

import React, { useState, useEffect } from "react";
import CustomBtn from "../components/common/CustomButton";
import { useKeycloak } from "@react-keycloak/web";
import GameImage from "../components/game/GameIMG";
import UserNameModal from "../components/game/UserNameModal";
import clearSessionStorageData from "../helpers/SessionStorageUtils";
import Container from "../components/common/Container";
import Map from "../components/map/Map";
import arrow from "../assets//ui/arrow.png";
import editIcon from "../assets/ui/edit.png";
import { useNavigate } from "react-router-dom";
import { useFetchGameMissions } from "../api/services/missionService";
import { useFetchGameRules } from "../api/services/ruleService";
import ListObjects from "../components/admin/createGame/ListObjects";
import ModalContainer from "../components/common/ModalContainer";

function AboutGame() {
  const { keycloak } = useKeycloak();
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const [showModal, setShowModal] = useState(false);
  const gameRules = useFetchGameRules(selectedGame?.ruleIds || []); // Using the custom hook
  const navigate = useNavigate();
  const gameMissions = useFetchGameMissions(selectedGame?.missionIds || []);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    clearSessionStorageData();
  }, []);

  return (

    <Container>
      <div className="flex flex-row  text-white  h-fit justify-center border-b pb-3 mb-3">
        <h1 className="text-3xl md:text-4xl font-bold mt-2 pr-3 ">
          {selectedGame?.title}
        </h1>
        <p className="bg-customGreen text-xs mt-0 self-center font-medium px-2.5 py-2 rounded-full w-fit">
          {selectedGame?.gameStateString}
        </p>
      </div>
      <div className="lg:grid md:grid-flow-col gap-3 mx-auto w-full ">

        <div className=" md:pb-0 px-auto   aspect-square">
          <GameImage game={selectedGame} />
        </div>

        {selectedGame && (
          <div className=" rounded lg:col-span-4 ">
            <div className=" grid grid-flow-rows gap-5">
              <div className="pb-5">
                <h2 className="text-lg font-bold ">ABOUT</h2>
                <p className="text-base ">{selectedGame.description} </p>
              </div>
              <div className="grid grid-cols-2 gap-2 ">
                <div className="grid col-span-1 mt-0 h-fit">
                  <h2 className="text-lg font-bold">RULES</h2><ListObjects list={gameRules} /></div>
                <div className="grid col-span-1 mt-0 h-fit"><h2 className="text-lg font-bold">MISSIONS</h2><ListObjects list={gameMissions} /></div>

              </div>
            </div>
          </div>
        )}{" "}

      </div>
      <div className="h-full justify-center flex flex-col mx-auto px-auto pb-20 text-center">
        <h2 className="text-lg font-bold pb-3">MAP</h2>
        <Map />
      </div>

      {showModal && (
        <ModalContainer showModal={showModal} handleCloseModal={handleCloseModal}>
          <UserNameModal onClose={handleCloseModal} />
        </ModalContainer>
      )}

      <div className="mb-20 mr-8 space-y-5 fixed bottom-0 right-0 flex flex-row">
        {keycloak.authenticated && keycloak.hasRealmRole("admin") && (
          <CustomBtn
            label={"Edit game"}
            icon={editIcon}
            iconPosition={"after"}
            rounded={"3xl"}
            onClick={() => navigate("/EditGame")}
          />
        )}
        {/* {keycloak.authenticated && keycloak.hasRealmRole("user") && ( */}
        <CustomBtn
          onClick={handleButtonClick}
          label="Join Game"
          className=" "
          icon={arrow}
          rounded={"3xl"}
          iconPosition={"after"}
        />

      </div>

    </Container>
  );
}

export default AboutGame;
