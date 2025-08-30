import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setRole(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedRole) setRole(storedRole);
    if (storedUser) setUser(JSON.parse(storedUser));

    let timeout;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000;
        const now = Date.now();

        if (now >= exp) {
          logout();
        } else {
          timeout = setTimeout(() => {
            logout();
            alert("Your session has expired.");
          }, exp - now);
        }
      } catch (err) {
        logout();
      }
    }

    setLoading(false);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [logout]);

  return (
    <UserContext.Provider
      value={{ role, setRole, user, setUser, logout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
