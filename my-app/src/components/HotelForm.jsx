
import { useEffect, useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import { useHotels } from "../context/HotelContext";

const initialForm = {
  roomNumber: "",
  guestName: "",
  roomType: "Single",
  price: "",
  status: "Available",
  checkIn: ""
};

function HotelForm({ selectedHotel, onClose }) {
  const { hotels, addHotel, updateHotel } = useHotels();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedHotel) {
      setForm({
        ...selectedHotel,
        price: String(selectedHotel.price),
        checkIn: selectedHotel.checkIn || ""
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [selectedHotel]);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.roomNumber.trim() || !form.guestName.trim()) {
      setError("Room number and guest name are required.");
      return;
    }

    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    ) {
      setError("Enter a valid room price.");
      return;
    }

    const duplicate = hotels.some(
      hotel =>
        hotel.roomNumber.toLowerCase() ===
          form.roomNumber.trim().toLowerCase() &&
        hotel.id !== selectedHotel?.id
    );

    if (duplicate) {
      setError("Room number already exists.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        roomNumber: form.roomNumber.trim(),
        guestName: form.guestName.trim(),
        price: Number(form.price)
      };

      if (selectedHotel) {
        await updateHotel(selectedHotel.id, payload);
      } else {
        await addHotel(payload);
      }

      onClose();
    } catch (err) {
      setError(err.message || "Unable to save room.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel p-3 p-md-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">
          {selectedHotel ? "Update Hotel Room" : "Add Hotel Room"}
        </h4>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClose}
          aria-label="Close form"
        >
          <FaTimes />
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6 col-lg-4">
            <label className="form-label">Room Number</label>
            <input
              className="form-control"
              name="roomNumber"
              value={form.roomNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <label className="form-label">Guest Name</label>
            <input
              className="form-control"
              name="guestName"
              value={form.guestName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <label className="form-label">Room Type</label>
            <select
              className="form-select"
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
            >
              {["Single", "Double", "Deluxe", "Suite"].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 col-lg-4">
            <label className="form-label">Price Per Night (₹)</label>
            <input
              className="form-control"
              type="number"
              name="price"
              min="0"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6 col-lg-4">
            <label className="form-label">Status</label>
            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              {["Available", "Occupied", "Maintenance"].map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6 col-lg-4">
            <label className="form-label">Check-in Date</label>
            <input
              className="form-control"
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">
          <button className="btn btn-primary" disabled={saving}>
            <FaSave className="me-2" />
            {saving ? "Saving..." : selectedHotel ? "Update Room" : "Add Room"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default HotelForm;
