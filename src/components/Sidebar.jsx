
function Sidebar({
  district,
  onDistrictChange,
  places,
  selectedPlace,
  onPlaceSelect,
}) {
  const handlePlaceChange = (event) => {
    const place = places.find(
      (item) => item.name === event.target.value
    );

    onPlaceSelect(place || null);
  };

  return (
    <section className="filter-section" id="districts">
      <div className="filter-heading">
        <h2>Explore Locations</h2>
        <p>Find and explore places on the map.</p>
      </div>

      <div className="filter-controls">

        {/* District Dropdown */}
        <div className="filter-group">
          <label htmlFor="district">District</label>

          <select
            id="district"
            value={district}
            onChange={(event) =>
              onDistrictChange(event.target.value)
            }
          >
            <option value="All">All Districts</option>
            <option value="Kavre">Kavre</option>
            <option value="Sindhupalchowk">
              Sindhupalchowk
            </option>
          </select>
        </div>

        {/* Place Dropdown */}
        <div className="filter-group">
          <label htmlFor="place">Location</label>

          <select
            id="place"
            value={selectedPlace || ""}
            onChange={handlePlaceChange}
          >
            <option value="">All Locations</option>

            {places.map((place) => (
              <option key={place.name} value={place.name}>
                {place.name}
              </option>
            ))}
          </select>
        </div>

      </div>
    </section>
  );
}

export default Sidebar;
