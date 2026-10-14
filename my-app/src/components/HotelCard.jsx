
import {
  FaBed,
  FaEdit,
  FaTrash,
  FaUser
} from "react-icons/fa";
import { useHotels } from "../context/HotelContext";

function HotelCard({ hotel, onEdit }) {
  const { deleteHotel } = useHotels();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete room ${hotel.roomNumber}?`
    );

    if (!confirmed) return;

    try {
      await deleteHotel(hotel.id);
    } catch (error) {
      window.alert(error.message || "Unable to delete room.");
    }
  }

  const currency = amount =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(Number(amount || 0));

  return (
    <div className="col-12 col-sm-6 col-xl-4">
      <article className="panel p-3 h-100">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="fw-bold">
              <FaBed className="me-2" />
              Room {hotel.roomNumber}
            </h5>

            <p className="muted mb-2">
              <FaUser className="me-2" />
              {hotel.guestName || "No guest assigned"}
            </p>
          </div>

          <span className={`status-pill ${
            String(hotel.status).toLowerCase()
          }`}>
            {hotel.status}
          </span>
        </div>

        <hr />

        <p>Room Type: <strong>{hotel.roomType}</strong></p>
        <p>Price: <strong>{currency(hotel.price)}</strong> / night</p>
        <p>Check-in: {hotel.checkIn || "Not scheduled"}</p>

        <div className="d-flex gap-2 mt-3">
          <button
            className="btn btn-outline-primary flex-fill"
            onClick={() => onEdit(hotel)}
          >
            <FaEdit className="me-2" />
            Edit
          </button>

          <button
            className="btn btn-outline-danger flex-fill"
            onClick={handleDelete}
          >
            <FaTrash className="me-2" />
            Delete
          </button>
        </div>
      </article>
    </div>
  );
}

export default HotelCard;
