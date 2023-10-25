import React, { useState, useEffect } from "react";
import { getSquadMarkers } from "../../services/mapService";
import gravestoneIcon from "../../assets/icons/gravestone1.png";

const GravestoneMarker = () => {
  const [killLocations, setKillLocations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Asynchronous function to fetch kill locations with details
    async function fetchKillLocationsWithDetails() {
      try {
        // Fetch kill locations with details from the service
        const locationsWithDetails = await getSquadMarkers();
        setKillLocations(locationsWithDetails);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch kill locations with details:", error);
        setError("Failed to fetch data. Please try again later.");
        setIsLoading(false);
      }
    }

    // Call the function to fetch data when the component mounts
    fetchKillLocationsWithDetails();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading...</p>}{" "}
      {/* Display a loading message if data is still being fetched */}
      {error ? (
        // Display an error message if data fetching fails
        <div className="text-red-500">{error}</div>
      ) : (
        killLocations.map((location) => {
          if (
            location &&
            location.location &&
            location.location.locationId !== null
          ) {
            // Render the gravestone marker if location details are available
            return (
              <div
                key={location.location.id}
                className="absolute"
                style={{
                  left: `${location.location.xCoordinate}%`,
                  top: `${location.location.yCoordinate}%`,
                }}
              >
                <img
                  src={gravestoneIcon}
                  alt="Gravestone"
                  className="w-10 h-10"
                />
              </div>
            );
          } else {
            // Skip rendering for invalid or missing location details
            return null;
          }
        })
      )}
    </div>
  );
};

export default GravestoneMarker;
