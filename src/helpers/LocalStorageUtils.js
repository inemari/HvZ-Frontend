// Create a function to clear specific items from local storage
const clearLocalStorageData = () => {
    localStorage.removeItem('playerId');
    localStorage.removeItem('selectedSquadId');
    localStorage.removeItem('username');
  };
  
  export default clearLocalStorageData;
  