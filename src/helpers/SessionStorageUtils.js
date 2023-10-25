// Create a function to clear specific items from local storage
const clearSessionStorageData = () => {
  sessionStorage.removeItem("playerId");
  sessionStorage.removeItem("selectedSquadId");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("joinedGame");
  sessionStorage.removeItem("joinedSquadId");
  //localStorage.removeItem("selectedGame");
};

export default clearSessionStorageData;
