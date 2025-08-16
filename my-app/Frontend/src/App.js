import "./App.css";
import Loginbox from "./Components/loginbox";
import AdminPage from "./Components/AdminPage";
import UserPage from "./Components/UserPage";
import CPA from "./Components/AdminSubPages/CPA";
import Employee from "./Components/AdminSubPages/Employee";
import Tip from "./Components/AdminSubPages/Tip";
import Schedule from "./Components/AdminSubPages/Schedule";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./context/usercontext";

function App() {
  const { role } = useUser();

  return (
    <Routes>
      {!role && <Route path="/login" element={<Loginbox />} />}

      {role === "admin" && (
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Employee />} />
          <Route path="Employee" element={<Employee />} />
          <Route path="Schedule" element={<Schedule />} />
          <Route path="Tip" element={<Tip />} />
          <Route path="Cpa" element={<CPA />} />
        </Route>
      )}

      {role === "user" && <Route path="/user" element={<UserPage />} />}

      <Route
        path="*"
        element={
          !role ? (
            <Navigate to="/login" replace />
          ) : role === "admin" ? (
            <Navigate to="/admin" replace />
          ) : (
            <Navigate to="/user" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
