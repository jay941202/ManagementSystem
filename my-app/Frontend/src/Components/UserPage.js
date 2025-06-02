import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../context/usercontext";

export default function UserPage() {
  const { user } = useUser();
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="bg-twohas text-white px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold select-none">{`Welcome ${user}`}</h1>
        <nav className="flex gap-6 text-lg font-semibold">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `transition ${
                isActive ? "border-b-2 border-white" : "hover:text-gray-300"
              }`
            }
          >
            Schedule
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive }) =>
              `transition ${
                isActive ? "border-b-2 border-white" : "hover:text-gray-300"
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `transition ${
                isActive ? "border-b-2 border-white" : "hover:text-gray-300"
              }`
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="logs"
            className={({ isActive }) =>
              `transition ${
                isActive ? "border-b-2 border-white" : "hover:text-gray-300"
              }`
            }
          >
            Logs
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
