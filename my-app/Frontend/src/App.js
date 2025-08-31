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
import Recipe from "./Components/AdminSubPages/Recipe";
import Inventory from "./Components/AdminSubPages/Inventory";
import ClosingSummary from "./Components/AdminSubPages/ClosingSummary";
import UserInventory from "./Components/UserSubPages/UserInventory";
import Tv from "./Components/UserSubPages/Tv";
import Utilities from "./Components/UserSubPages/Utilities";
import UserRecipe from "./Components/UserSubPages/UserRecipe";

function App() {
  const { role, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {!role && <Route path="/login" element={<Loginbox />} />}

      {role === "admin" && (
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<Navigate to="Employee" replace />} />
          <Route path="Employee" element={<Employee />} />
          <Route path="Schedule" element={<Schedule />} />
          <Route path="Tip" element={<Tip />} />
          <Route path="Cpa" element={<CPA />} />
          <Route path="Recipe" element={<Recipe />} />
          <Route path="Inventory" element={<Inventory />} />
          <Route path="Day Summary" element={<ClosingSummary />} />
        </Route>
      )}

      {role === "user" && (
        <Route path="/user" element={<UserPage />}>
          <Route index element={<Navigate to="Utilities" replace />} />
          <Route path="Inventory" element={<UserInventory />} />
          <Route path="Recipe" element={<UserRecipe />} />
          <Route path="TV" element={<Tv />} />
          <Route path="Utilities" element={<Utilities />} />
        </Route>
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
  );
}

export default App;
