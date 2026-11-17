
function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>🌍</span>
        <h2>GeoExplore</h2>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="#districts">Districts</a>
        <a href="#about">About</a>
      </div>
    </nav>
  );
}

export default Navbar;
