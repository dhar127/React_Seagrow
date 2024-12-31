import React, { useState } from "react";
import axios from "axios";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useNavigate } from "react-router-dom";
import './Map.css';
import RideHistory from './RideHistory';


const App = () => {
  const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiYWtzaGF5YXJtazUiLCJhIjoiY201NWc2dTltMzh1YjJuczczeXFhdmRrdSJ9.8RzmHfbYQU27iVJLSink1A"; // Replace with your Mapbox token

  const [sourcePlace, setSourcePlace] = useState("");
  const [destinationPlace, setDestinationPlace] = useState("");
  const [route, setRoute] = useState(null);
  const [rideHistory,setRideHistory] = useState(null);

  // Coordinates for source and destination
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const navigate = useNavigate();

  // Function to call the Mapbox Geocoding API
  const geocodePlace = async (query) => {
    const geocodeUrl = `https://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(
      query
    )}&access_token=${MAPBOX_ACCESS_TOKEN}`;

    try {
      const response = await axios.get(geocodeUrl);

      if (response.data?.features?.length > 0) {
        const coordinates = response.data.features[0].geometry.coordinates; // Extract coordinates
        return coordinates;
      } else {
        alert(`No results found for: ${query}`);
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  // Fetch the route between two coordinates
  const fetchRoute = async () => {
    if (!sourceCoords || !destinationCoords) return;

    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceCoords[0]},${sourceCoords[1]};${destinationCoords[0]},${destinationCoords[1]}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

    try {
      const response = await axios.get(directionsUrl);

      if (response.data?.routes?.length > 0) {
        setRoute(response.data.routes[0]); // Store the route
      } else {
        alert("No route found");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Geocode both source and destination places
    const sourceCoordinates = await geocodePlace(sourcePlace);
    const destinationCoordinates = await geocodePlace(destinationPlace);

    if (sourceCoordinates && destinationCoordinates) {
      setSourceCoords(sourceCoordinates);
      setDestinationCoords(destinationCoordinates);
      fetchRoute(); // Fetch route after geocoding
    } else {
      alert("Invalid place names or structured inputs. Please try again.");
    }
  };
  const handleBookingConfirmation = () => {
    

    navigate("/payment");
  };
  

  // Map Layer Style for the Route
  const routeLayer = {
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#ff0000",
      "line-width": 4,
    },
  };

  return (
    <div>
      <h1>Route Finder</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Source:
          <input
            type="text"
            value={sourcePlace}
            onChange={(e) => setSourcePlace(e.target.value)}
            placeholder="Enter source (e.g., Pallavaram)"
            required
          />
        </label>
        <br />
        <label>
          Destination:
          <input
            type="text"
            value={destinationPlace}
            onChange={(e) => setDestinationPlace(e.target.value)}
            placeholder="Enter destination (e.g., Tambaram)"
            required
          />
        </label>
        <br />
        <button type="submit">Get Route</button>
      </form>

      {route && (
        <div>
          <h2>Route Information</h2>
          <p>Distance: {(route.distance / 1000).toFixed(2)} km</p>
          <p>Duration: {(route.duration / 60).toFixed(2)} minutes</p>
          <button onClick={handleBookingConfirmation}>Confirm Booking</button>
          
        </div>
      )}

      <div style={{ height: "500px", marginTop: "20px" }}>
        <Map
          initialViewState={{
            longitude: sourceCoords ? sourceCoords[0] : 80.22,
            latitude: sourceCoords ? sourceCoords[1] : 12.97,
            zoom: 12,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        >
          {sourceCoords && (
            <Marker
              longitude={sourceCoords[0]}
              latitude={sourceCoords[1]}
              color="green"
            />
          )}
          {destinationCoords && (
            <Marker
              longitude={destinationCoords[0]}
              latitude={destinationCoords[1]}
              color="red"
            />
          )}
          {route && (
            <Source id="route" type="geojson" data={route.geometry}>
              <Layer {...routeLayer} />
            </Source>
          )}
        </Map>
      </div>
      <RideHistory historyData={rideHistory} />
    </div>
  );
};

export default App;


