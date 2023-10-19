// Create a function to clear specific items from local storage
const clearSessionStorageData = () => {
    sessionStorage.removeItem('playerId');
    sessionStorage.removeItem('selectedSquadId');
    sessionStorage.removeItem('username');
  };
  
  export default clearSessionStorageData;
  