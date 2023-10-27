// Removes session storage items related to player, game, and squad.
const clearSessionStorageData = () => {
  sessionStorage.removeItem("playerId");
  sessionStorage.removeItem("selectedSquadId");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("joinedGame");
  sessionStorage.removeItem("joinedSquadId");

};
export default clearSessionStorageData;
