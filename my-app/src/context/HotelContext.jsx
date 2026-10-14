
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";

const HotelContext = createContext();
const API = "http://localhost:5000/hotels";

export function HotelProvider({ children }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHotels = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API);
      if (!response.ok) throw new Error("Unable to load hotel rooms");

      setHotels(await response.json());
    } catch (err) {
      setError(
        err instanceof TypeError
          ? "Unable to connect to the hotel API. Check that the server is running, then try again."
          : err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  async function addHotel(hotel) {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hotel)
    });

    if (!response.ok) throw new Error("Unable to add room");

    const savedHotel = await response.json();
    setHotels(prev => [...prev, savedHotel]);
    return savedHotel;
  }

  async function updateHotel(id, updatedHotel) {
    const response = await fetch(`${API}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedHotel)
    });

    if (!response.ok) throw new Error("Unable to update room");

    const savedHotel = await response.json();

    setHotels(prev =>
      prev.map(hotel =>
        hotel.id === id ? savedHotel : hotel
      )
    );
  }

  async function deleteHotel(id) {
    const response = await fetch(`${API}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Unable to delete room");

    setHotels(prev => prev.filter(hotel => hotel.id !== id));
  }

  return (
    <HotelContext.Provider
      value={{
        hotels,
        loading,
        error,
        addHotel,
        updateHotel,
        deleteHotel,
        loadHotels
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export function useHotels() {
  return useContext(HotelContext);
}
