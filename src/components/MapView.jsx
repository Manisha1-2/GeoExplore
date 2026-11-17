import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
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

function MapView() {
  const [position, setPosition] = useState(null);

  return (
    <MapContainer
      center={[27.6298, 85.5214]}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onMapClick={setPosition} />

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
