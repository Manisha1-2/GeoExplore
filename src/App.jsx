
import { useState } from "react";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";

import "./App.css";

function App() {
  const [district, setDistrict] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);


const places = [
  // EXISTING KAVRE PLACES
  {
    name: "Banepa",
    district: "Kavre",
    lat: 27.6299,
    lng: 85.524,
  },
  {
    name: "Dhulikhel",
    district: "Kavre",
    lat: 27.6232,
    lng: 85.5661,
  },
  {
    name: "Panauti",
    district: "Kavre",
    lat: 27.58466,
    lng: 85.52122,
  },

  {
    name: "Namobuddha",
    district: "Kavre",
    lat: 27.5815,
    lng: 85.5065,
  },

  {
    name: "Nala",
    district: "Kavre",
    lat: 27.6875,
    lng: 85.505,
  },

  {
    name: "Balthali",
    district: "Kavre",
    lat: 27.555,
    lng: 85.525,
  },

  
  {
    name: "Chautara",
    district: "Sindhupalchowk",
    lat: 27.7763,
    lng: 85.7127,
  },

  {
    name: "Melamchi",
    district: "Sindhupalchowk",
    lat: 27.83168,
    lng: 85.57254,
  },

  {
    name: "Barhabise",
    district: "Sindhupalchowk",
    lat: 27.793854,
    lng: 85.897505,
  },

  {
    name: "Helambu",
    district: "Sindhupalchowk",
    lat: 27.879,
    lng: 85.579,
  },

  {
    name: "Panchpokhari",
    district: "Sindhupalchowk",
    lat: 28.015,
    lng: 85.626,
  },
  
  {
    name: "Tatopani",
    district: "Sindhupalchowk",
    lat: 27.952,
    lng: 85.964,
  },
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
          <MapView
            places={filteredPlaces}
            selectedPlace={selectedPlace}
          />
        </section>
      </main>

    
    </div>
  );
}

export default App;
