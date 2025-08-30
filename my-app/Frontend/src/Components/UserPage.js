import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../context/usercontext";

export default function UserPage() {
  const { user, logout } = useUser();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-twohas text-white px-6 py-4 shadow-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-twohas font-bold">
            {user.name[0].toUpperCase()}
          </div>
          <h1 className="text-2xl font-semibold select-none">
            Welcome, {user.name}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex gap-4 flex-wrap">
            {["dashboard", "users", "settings", "logs"].map((path) => (
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
                {path.charAt(0).toUpperCase() + path.slice(1)}
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
