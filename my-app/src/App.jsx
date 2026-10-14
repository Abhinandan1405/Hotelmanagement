
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import HotelForm from "./components/HotelForm";
import SearchFilter from "./components/SearchFilter";
import HotelList from "./components/HotelList";
import useDebounce from "./useDebounce";

function App() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  function openAddForm() {
    setSelectedHotel(null);
    setShowForm(true);
  }

  function openEditForm(hotel) {
    setSelectedHotel(hotel);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setSelectedHotel(null);
  }

  return (
    <div className="app-shell">
      <Navbar />

      <main className="container-fluid px-3 px-md-4 py-4">
        <div className="d-flex justify-content-between
          align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h2 className="fw-bold">Hotel Dashboard</h2>
            <p className="muted">Manage rooms and guest reservations.</p>
          </div>

          <button className="btn btn-primary" onClick={openAddForm}>
            <FaPlus className="me-2" />
            Add New Room
          </button>
        </div>

        <Dashboard />

        {showForm && (
          <HotelForm
            selectedHotel={selectedHotel}
            onClose={closeForm}
          />
        )}

        <SearchFilter
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <HotelList
          search={debouncedSearch}
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          onEdit={openEditForm}
        />
      </main>
    </div>
  );
}

export default App;
