import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "../context/usercontext";

export default function AdminPage() {
  const { logout } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [menuOpen]);

  const paths = [
    "Employee",
    "Schedule",
    "Tip",
    "CPA",
    "Recipe",
    "Inventory",
    "Day Summary",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-twohas text-white px-6 py-4 shadow-lg flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-semibold select-none">Admin Panel</h1>
          <div className="flex items-center gap-2">
            <button
              className="bg-white text-twohas px-3 py-1 rounded-md text-sm font-medium shadow hover:bg-gray-100 transition"
              onClick={logout}
            >
              Log out
            </button>
            <button
              className="bg-white text-twohas px-3 py-1 rounded-md text-sm font-medium shadow hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰ Menu
            </button>
          </div>
        </div>

        <nav
          ref={menuRef}
          style={{
            maxHeight: menuOpen ? `${menuHeight}px` : "0px",
            transition: "max-height 0.3s ease",
          }}
          className="flex flex-col gap-2 overflow-hidden"
        >
          {paths.map((path) => (
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
              onClick={() => setMenuOpen(false)}
            >
              {path}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
