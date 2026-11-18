import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

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
function FitMapToPlaces({ places }) {

  const map = useMap();

  useEffect(() => {
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
  }, [places, map]);

  return null;
}

// Zoom to the selected location
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


function MapView({ places = [], selectedPlace }) {
  const [position, setPosition] = useState(null);

  return (
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

      <MapClickHandler onMapClick={setPosition} />

      <FitMapToPlaces places={places} />

      <ZoomToSelectedPlace selectedPlace={selectedPlace} />

      {places.map((place) => (
        <Marker
          key={place.name}
          position={[place.lat, place.lng]}
        >
          <Popup>
            <h3>{place.name}</h3>
            <p>District: {place.district}</p>
            <p>Latitude: {place.lat}</p>
            <p>Longitude: {place.lng}</p>
          </Popup>
        </Marker>
      ))}

      {position && (
        <Marker position={position}>
          <Popup>
            <h3>Selected Location</h3>
            <p>Latitude: {position.lat.toFixed(5)}</p>
            <p>Longitude: {position.lng.toFixed(5)}</p>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapView;
