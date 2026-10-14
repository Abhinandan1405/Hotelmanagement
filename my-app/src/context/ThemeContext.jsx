
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(
    () => localStorage.getItem("hotel-theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );

    localStorage.setItem("hotel-theme", dark ? "dark" : "light");
  }, [dark]);

  function toggleTheme() {
    setDark(previous => !previous);
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
