
import { FaSearch, FaFilter } from "react-icons/fa";
import useDebounce from "../useDebounce";

function SearchFilter({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  statusFilter,
  setStatusFilter
}) {
  const debouncedSearch = useDebounce(search, 400);

  return (
    <section className="panel p-3 mb-4">
      <div className="row g-3">
        <div className="col-12 col-md-6 col-lg-4">
          <label className="form-label">
            <FaSearch className="me-2" />
            Search Rooms
          </label>

          <input
            type="search"
            className="form-control"
            placeholder="Room number, guest name..."
            value={search}
            onChange={event => setSearch(event.target.value)}
          />

          <small className="muted">
            Search waits 400 ms after typing stops.
          </small>
        </div>

        <div className="col-6 col-md-3 col-lg-4">
          <label className="form-label">
            <FaFilter className="me-2" />
            Room Type
          </label>

          <select
            className="form-select"
            value={typeFilter}
            onChange={event => setTypeFilter(event.target.value)}
          >
            {["All", "Single", "Double", "Deluxe", "Suite"].map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="col-6 col-md-3 col-lg-4">
          <label className="form-label">Room Status</label>

          <select
            className="form-select"
            value={statusFilter}
            onChange={event => setStatusFilter(event.target.value)}
          >
            {["All", "Available", "Occupied", "Maintenance"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => {
            setSearch("");
            setTypeFilter("All");
            setStatusFilter("All");
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Parent can use this value for debounced filtering. */}
      <div className="d-none">{debouncedSearch}</div>
    </section>
  );
}

export default SearchFilter;
