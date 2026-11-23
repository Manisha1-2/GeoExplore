
import { useState } from "react";
import calculateDistance from "../utils/distance";

function DistanceCalculator({ places }) {
  const [startPlace, setStartPlace] = useState("");
  const [endPlace, setEndPlace] = useState("");
  const [distance, setDistance] = useState(null);

  const handleCalculate = () => {
    const start = places.find(
      (place) => place.name === startPlace
    );

    const end = places.find(
      (place) => place.name === endPlace
    );

    if (!start || !end || start === end) {
      setDistance(null);
      return;
    }

    const result = calculateDistance(
      start.lat,
      start.lng,
      end.lat,
      end.lng
    );

    setDistance(result);
  };

  return (
    <div className="distance-calculator">
      <h2>Distance Calculator</h2>
      <p>Calculate the distance between two places.</p>

      <div>
        <label>Starting Location</label>
        <select
          value={startPlace}
          onChange={(e) => {
            setStartPlace(e.target.value);
            setDistance(null);
          }}
        >
          <option value="">Select Starting Place</option>

          {places.map((place) => (
            <option key={place.name} value={place.name}>
              {place.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Destination</label>
        <select
          value={endPlace}
          onChange={(e) => {
            setEndPlace(e.target.value);
            setDistance(null);
          }}
        >
          <option value="">Select Destination</option>

          {places.map((place) => (
            <option key={place.name} value={place.name}>
              {place.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleCalculate}>
        Calculate Distance
      </button>

      {distance !== null && (
        <div className="distance-result">
          <h3>Distance</h3>
          <p>{distance.toFixed(2)} km</p>
          <p>{(distance * 1000).toFixed(0)} metres</p>
        </div>
      )}
    </div>
  );
}

export default DistanceCalculator;
