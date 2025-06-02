import "./App.css";
import Loginbox from "./Components/loginbox";
import { useUser } from "./context/usercontext";
import AdminPage from "./Components/AdminPage";
import UserPage from "./Components/UserPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CPA from "./Components/AdminSubPages/CPA";
import Employee from "./Components/AdminSubPages/Employee";
import Tip from "./Components/AdminSubPages/Tip";
import Schedule from "./Components/AdminSubPages/Schedule";

function App() {
  const { role } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        {!role && <Route path="/login" element={<Loginbox />} />}
        {role === "admin" ? (
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<Employee />} />
            <Route path="Employee" element={<Employee />} />
            <Route path="Schedule" element={<Schedule />} />
            <Route path="Cpa" element={<CPA />} />
            <Route path="Tip" element={<Tip />} />
          </Route>
        ) : (
          <Route path="user" element={<UserPage />} />
        )}
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
    </BrowserRouter>
  );
}

export default App;
