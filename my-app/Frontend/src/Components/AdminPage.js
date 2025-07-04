import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import background from "../Assets/background2.png";

export default function AdminPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <header className="bg-twohas text-white px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold select-none">Admin Panel</h1>
        <img
          src={background}
          alt="Background Logo"
          className="absolute inset-0 w-full h-full object-contain opacity-5 pointer-events-none select-none z-0"
        />
        <nav className="flex gap-6 text-lg font-semibold">
          <NavLink
            to="Employee"
            className={({ isActive }) =>
              `transition ${
                isActive ? "border-b-2 border-white" : "hover:text-gray-300"
              }`
            }
          >
            Employee
          </NavLink>
          <NavLink
            to="Schedule"
            className={({ isActive }) =>
              `transition ${
                isActive ? "border-b-2 border-white" : "hover:text-gray-300"
              }`
            }
          >
            Schedule
          </NavLink>
          <NavLink
            to="CPA"
            className={({ isActive }) =>
              `transition ${
                isActive ? "border-b-2 border-white" : "hover:text-gray-300"
              }`
            }
          >
            CPA
          </NavLink>
          <NavLink
            to="Tip"
            className={({ isActive }) =>
              `transition ${
                isActive ? "border-b-2 border-white" : "hover:text-gray-300"
              }`
            }
          >
            Tip
          </NavLink>
        </nav>
      </header>
      <main className="flex-1 p-8 overflow-auto z-15">
        <Outlet />
      </main>
    </div>
  );
}
