
import { useState, useEffect } from "react";
import { divIcon } from "leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";

import calculateDistance from "../utils/distance";

// Handle clicks on the map
function MapClickHandler({ onMapClick }) {
  const map = useMapEvents({
    click: (event) => {
      const clickedLocation = event.latlng;

      onMapClick(clickedLocation);

      map.flyTo(clickedLocation, 14, {
        duration: 1.5,
      });
    },
  });

  return null;
}

// Automatically adjust map to filtered locations
function FitMapToPlaces({ places, selectedPlace }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) return;

    if (places.length > 0) {
      const bounds = places.map((place) => [
        place.lat,
        place.lng,
      ]);

      map.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 12,
      });
    }
  }, [places, selectedPlace, map]);

  return null;
}

// Zoom to selected location
function ZoomToSelectedPlace({ selectedPlace }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      map.flyTo(
        [selectedPlace.lat, selectedPlace.lng],
        15,
        { duration: 1.5 }
      );
    }
  }, [selectedPlace, map]);

  return null;
}

// Custom diamond marker
const customMarker = divIcon({
  className: "custom-marker",
  html: `<div class="marker-diamond">◆</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function MapView({ places = [], selectedPlace }) {
  const [measurementPoints, setMeasurementPoints] = useState([]);

  // Select two points for distance measurement
  const handleMapClick = (clickedLocation) => {
    setMeasurementPoints((previousPoints) => {
      if (previousPoints.length === 2) {
        return [clickedLocation];
      }

      return [...previousPoints, clickedLocation];
    });
  };

  // Calculate distance after selecting two points
  const distance =
    measurementPoints.length === 2
      ? calculateDistance(
          measurementPoints[0].lat,
          measurementPoints[0].lng,
          measurementPoints[1].lat,
          measurementPoints[1].lng
        )
      : null;

  // Clear selected points
  const clearMeasurement = () => {
    setMeasurementPoints([]);
  };

  return (
    <div style={{ position: "relative" }}>

      <MapContainer
        center={[27.6298, 85.5214]}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
        dragging={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler onMapClick={handleMapClick} />

        <FitMapToPlaces
          places={places}
          selectedPlace={selectedPlace}
        />

        <ZoomToSelectedPlace
          selectedPlace={selectedPlace}
        />

      
{/* Existing place markers */}
{places.map((place) => (
  <Marker
    key={place.name}
    position={[place.lat, place.lng]}
    icon={customMarker}
  >
   
    <Popup>
      <h3>{place.name}</h3>
      <p>District: {place.district}</p>
      <p>Latitude: {place.lat}</p>
      <p>Longitude: {place.lng}</p>
    </Popup>
  </Marker>
))}


        {/* Measurement markers */}
        {measurementPoints.map((point, index) => (
          <Marker
            key={index}
            position={point}
          >
            <Popup>
              {index === 0 ? "Starting Point" : "Destination"}
              <br />
              Latitude: {point.lat.toFixed(5)}
              <br />
              Longitude: {point.lng.toFixed(5)}
            </Popup>
          </Marker>
        ))}

        {/* Line connecting the two points */}
        {measurementPoints.length === 2 && (
          <Polyline
            positions={measurementPoints}
            pathOptions={{
              color: "red",
              weight: 4,
              dashArray: "8, 8",
            }}
          />
        )}
      </MapContainer>

      {/* Distance information */}
      <div
        style={{
          position: "absolute",
          bottom: "15px",
          left: "15px",
          zIndex: 1000,
          background: "white",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        {measurementPoints.length === 0 && (
          <p style={{ margin: 0 }}>
            Click on the map to select a starting point.
          </p>
        )}

        {measurementPoints.length === 1 && (
          <p style={{ margin: 0 }}>
            Now click on the map to select your destination.
          </p>
        )}

        {distance !== null && (
          <div>
            <strong>Measured Distance</strong>
            <h3 style={{ margin: "6px 0" }}>
              {distance.toFixed(2)} km
            </h3>
            <p style={{ margin: 0 }}>
              {(distance * 1000).toFixed(0)} metres
            </p>
          </div>
        )}

        {measurementPoints.length > 0 && (
          <button
            onClick={clearMeasurement}
            style={{ marginTop: "10px", cursor: "pointer" }}
          >
            Clear Measurement
          </button>
        )}
      </div>
    </div>
  );
}

export default MapView;
