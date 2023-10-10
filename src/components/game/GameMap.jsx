import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl'; // Import Mapbox GL library
import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox GL CSS

const GameMap = () => {
  useEffect(() => {
    // Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your actual Mapbox access token - Just a temporary example
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const initialLongitude = -122.4194; // Replace with your initial longitude - Just a temporary example
    const initialLatitude = 37.7749; // Replace with your initial latitude - Just a temporary example
 
    const map = new mapboxgl.Map({
      container: 'map-container', // HTML container ID
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [initialLongitude, initialLatitude], // Initial center coordinates
      zoom: 12, // Initial zoom level
    });

    // Customize the map and add markers or layers as needed

    // Clean up the map on unmount
    return () => map.remove();
  }, []);

  return <div id="map-container" className="w-full h-96"></div>;
};

export default GameMap;
