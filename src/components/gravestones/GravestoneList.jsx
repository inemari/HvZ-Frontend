import React, { useEffect, useState } from "react";
import GravestoneMarker from "./GravestoneMarker";
import { getKillLocationsWithDetails } from "../../services/mapService";

const GravestoneList = () => {
  // Define a state variable to store the fetched kill locations with details
  const [killLocations, setKillLocations] = useState([]);

  // Use the useEffect hook to fetch kill locations with details when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch kill locations with details
    async function fetchKillLocationsWithDetails() {
      try {
        // Fetch the locations with details from the service
        const locationsWithDetails = await getKillLocationsWithDetails();
        
        // Update the state variable with the fetched data
        setKillLocations(locationsWithDetails);
      } catch (error) {
        // Log an error message if there's an issue fetching data
        console.error("Failed to fetch kill locations with details:", error);
      }
    }

    // Call the fetchKillLocationsWithDetails function when the component mounts
    fetchKillLocationsWithDetails();
  }, []); // The empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      {killLocations.map((location) => (
        // Map through the fetched kill locations and render GravestoneMarker components
        <GravestoneMarker key={location.location.id} location={location.location} />
      ))}
    </div>
  );
};

export default GravestoneList;
