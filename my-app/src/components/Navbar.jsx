
import { FaHotel, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { dark, toggleTheme } = useTheme();

  return (
    <nav className="navbar app-navbar px-3 px-md-4">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#dashboard">
          <FaHotel className="me-2" />
          HotelEase
        </a>

        <div className="d-flex align-items-center gap-3">
          <span className="d-none d-sm-inline">
            Hotel Management
          </span>

          <button
            className="btn theme-button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title="Toggle dark/light mode"
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
