import React from "react";
import useGames from "../../services/useGames";
import GameCard from "./GameCard";
import NewGameBtn from "../admin/newGameBtn";
import keycloak from "../../Keycloak";

const Games = ({ activeTab }) => {
  const { games, handleGameClick } = useGames(activeTab);

  return (
    <>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 my-auto max-h-36 gap-5 h-full">
        {games.map((game) => (
          <GameCard
            game={game}
            key={game.id}
            onClick={() => handleGameClick(game)}
          />
        ))}
      </div>

      {keycloak.authenticated && keycloak.hasRealmRole("admin") && (
        <div className="m-5 space-y-5 break-words absolute bottom-20 right-0 ">
          <NewGameBtn />
        </div>
      )}
    </>
  );
};

export default Games;
