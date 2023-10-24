import React, { createContext, useContext, useState } from 'react';

// Create a context for location-related data
const LocationContext = createContext();

// Custom hook for using the location context
export function useLocationContext() {
  return useContext(LocationContext);
}

// LocationProvider component to wrap your application and provide location-related data
export function LocationProvider({ children }) {
   // Define the state and set functions for locationHubConnection
  const [locationHubConnection, setLocationHubConnection] = useState(null);

  return (
    <LocationContext.Provider value={{ locationHubConnection, setLocationHubConnection }}>
      {children}
    </LocationContext.Provider>
  );
}
