
import {
  FaHotel,
  FaCheckCircle,
  FaUsers,
  FaMoneyBillWave
} from "react-icons/fa";
import { useHotels } from "../context/HotelContext";

function Dashboard() {
  const { hotels } = useHotels();

  const available = hotels.filter(
    hotel => hotel.status === "Available"
  ).length;

  const occupied = hotels.filter(
    hotel => hotel.status === "Occupied"
  ).length;

  const revenue = hotels
    .filter(hotel => hotel.status === "Occupied")
    .reduce(
      (total, hotel) => total + Number(hotel.price || 0),
      0
    );

  const currency = amount =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);

  const cards = [
    {
      title: "Total Rooms",
      value: hotels.length,
      icon: <FaHotel />
    },
    {
      title: "Available Rooms",
      value: available,
      icon: <FaCheckCircle />
    },
    {
      title: "Occupied Rooms",
      value: occupied,
      icon: <FaUsers />
    },
    {
      title: "Occupied Room Value",
      value: currency(revenue),
      icon: <FaMoneyBillWave />
    }
  ];

  return (
    <div className="row g-3 mb-4">
      {cards.map(card => (
        <div className="col-6 col-xl-3" key={card.title}>
          <div className="panel stat-card p-3 p-md-4 h-100">
            <div className="d-flex justify-content-between gap-2">
              <div>
                <p className="muted mb-2">{card.title}</p>
                <h3 className="fw-bold mb-0">{card.value}</h3>
              </div>

              <span className="stat-icon">{card.icon}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
