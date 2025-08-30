import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../context/usercontext";

export default function AdminPage() {
  const { logout } = useUser();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-twohas text-white px-6 py-4 shadow-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold select-none">Admin Panel</h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 flex-wrap">
            {[
              "Employee",
              "Schedule",
              "Tip",
              "CPA",
              "Recipe",
              "Inventory",
              "Day Summary",
            ].map((path) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-1 rounded-md text-sm font-medium transition ${
                    isActive
                      ? "bg-white text-twohas shadow-md"
                      : "hover:bg-white/20"
                  }`
                }
              >
                {path}
              </NavLink>
            ))}
          </nav>
          <button
            onClick={logout}
            className="bg-white text-twohas font-semibold px-4 py-1 rounded-md shadow hover:bg-gray-100 transition"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
