import React, { createContext, useContext, useState } from 'react';

// Create a context for managing location-related data, like the locationHubConnection.
const LocationContext = createContext();

/**
 * A custom hook to access the LocationContext. Use this hook to access the locationHubConnection
 * or set a new connection within your components.
 */
export function useLocationContext() {
  return useContext(LocationContext);
}

/**
 * LocationProvider is a context provider that wraps your application. It provides access to
 * location-related data and manages the locationHubConnection state.
 */
export function LocationProvider({ children }) {
  const [locationHubConnection, setLocationHubConnection] = useState(null);

  return (
    <LocationContext.Provider value={{ locationHubConnection, setLocationHubConnection }}>
      {children}
    </LocationContext.Provider>
  );
}
