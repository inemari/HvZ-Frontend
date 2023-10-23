import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export function useLocationContext() {
  return useContext(LocationContext);
}

export function LocationProvider({ children }) {
  const [locationHubConnection, setLocationHubConnection] = useState(null);

  return (
    <LocationContext.Provider value={{ locationHubConnection, setLocationHubConnection }}>
      {children}
    </LocationContext.Provider>
  );
}
