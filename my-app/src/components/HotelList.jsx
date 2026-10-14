
import { FaEdit, FaTrash, FaBed } from "react-icons/fa";
import { useHotels } from "../context/HotelContext";

function HotelList({
  search = "",
  typeFilter = "All",
  statusFilter = "All",
  onEdit
}) {
  const { hotels, loading, error, deleteHotel, loadHotels } = useHotels();

  const query = search.toLowerCase().trim();

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = [
      hotel.roomNumber,
      hotel.guestName,
      hotel.roomType
    ].some(value =>
      String(value || "").toLowerCase().includes(query)
    );

    const matchesType =
      typeFilter === "All" || hotel.roomType === typeFilter;

    const matchesStatus =
      statusFilter === "All" || hotel.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  async function handleDelete(hotel) {
    if (!window.confirm(`Delete room ${hotel.roomNumber}?`)) {
      return;
    }

    try {
      await deleteHotel(hotel.id);
    } catch (err) {
      window.alert(err.message || "Unable to delete room.");
    }
  }

  if (loading) {
    return <div className="panel p-5 text-center">Loading rooms...</div>;
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex justify-content-between align-items-center gap-3">
        <span>{error}</span>
        <button
          className="btn btn-outline-danger flex-shrink-0"
          onClick={loadHotels}
        >
          Retry
        </button>
      </div>
    );
  }

  if (filteredHotels.length === 0) {
    return (
      <div className="panel p-5 text-center">
        <FaBed size={35} className="muted mb-3" />
        <h5>No rooms found</h5>
        <p className="muted mb-0">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <section className="panel overflow-hidden">
      <div className="p-3 border-bottom-custom">
        <h5 className="mb-0">
          Room Records ({filteredHotels.length})
        </h5>
      </div>

      <div className="table-responsive">
        <table className="table hotel-table align-middle mb-0">
          <thead>
            <tr>
              <th>Room</th>
              <th>Guest</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredHotels.map(hotel => (
              <tr key={hotel.id}>
                <td>#{hotel.roomNumber}</td>
                <td>{hotel.guestName || "—"}</td>
                <td>{hotel.roomType}</td>
                <td>
                  ₹{Number(hotel.price || 0).toLocaleString("en-IN")}
                </td>
                <td>
                  <span className={`status-pill ${
                    String(hotel.status).toLowerCase()
                  }`}>
                    {hotel.status}
                  </span>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onEdit(hotel)}
                      aria-label={`Edit room ${hotel.roomNumber}`}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(hotel)}
                      aria-label={`Delete room ${hotel.roomNumber}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default HotelList;
