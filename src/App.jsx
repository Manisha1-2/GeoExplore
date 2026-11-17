
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import "./App.css";

function App() {
  const [district, setDistrict] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = [
    { name: "Banepa", district: "Kavre" },
    { name: "Dhulikhel", district: "Kavre" },
    { name: "Panauti", district: "Kavre" },
    { name: "Chautara", district: "Sindhupalchok" },
    { name: "Melamchi", district: "Sindhupalchok" },
    { name: "Barhabise", district: "Sindhupalchok" },
  ];

  const filteredPlaces =
    district === "All"
      ? places
      : places.filter(
          (place) => place.district === district
        );

  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Sidebar
          district={district}
          onDistrictChange={(value) => {
            setDistrict(value);
            setSelectedPlace(null);
          }}
          places={filteredPlaces}
          selectedPlace={selectedPlace?.name}
          onPlaceSelect={setSelectedPlace}
        />

        <section className="map-section">
          <MapView />
        </section>
      </main>
    </div>
  );
}

export default App;
