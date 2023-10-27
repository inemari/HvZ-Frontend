import React from 'react';
import { useFetchGameRules } from '../../api/services/ruleService';
import ListObjects from '../admin/createGame/ListObjects';

const GameStats = () => {
  const selectedGame = JSON.parse(localStorage.getItem("selectedGame"));
  const StatNumbers = (values) => {
    let i = 0;
    for (const value of values) {
      i++;
    }
    return i;
  };
  const gameRules = useFetchGameRules(selectedGame?.ruleIds || []);



  return (
    <div className="grid grid-cols-2 justify-center gap-2 text-white w-full pb-3">
      <div className="flex col-span-2 items-center ">
        <h1 className="text-3xl md:text-4xl font-bold">
          {selectedGame?.title}</h1>
        <p className="bg-customGreen text-xs rounded-full p-2 h-fit w-fit m-2">{selectedGame?.gameStateString}
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-base"><b>About: <br /></b>{selectedGame.description} </p>
        <p className="text-base"><b>Rules:  </b> </p><ListObjects list={gameRules} />
      </div>

      <div className="space-y-3" >
        <h3 className="text-base"><b>Stats:   </b> </h3>
        <p className="text-base "><b>Number of players in game: </b> {StatNumbers(selectedGame.playerIds)} </p>
        <p className="text-base "><b>Missions:  </b> {StatNumbers(selectedGame.missionIds)} </p>


      </div>
      <h2 className="text-1xl md:text-2xl font-bold">Map</h2>
    </div>
  );
};

export default GameStats;
