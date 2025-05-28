import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="flex h-screen text-white">
      {/* 사이드바 */}
      <aside className="w-64 bg-twohas p-6 flex flex-col">
        <h2 className="text-3xl font-bold mb-8 select-none">Admin Panel</h2>
        <nav className="flex flex-col space-y-4 text-lg font-semibold">
          <NavLink
            to="dashboard"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition ${
                isActive ? "bg-[#34495e]" : "hover:bg-[#34495e]"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="users"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition ${
                isActive ? "bg-[#34495e]" : "hover:bg-[#34495e]"
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition ${
                isActive ? "bg-[#34495e]" : "hover:bg-[#34495e]"
              }`
            }
          >
            Settings
          </NavLink>
          <NavLink
            to="logs"
            className={({ isActive }) =>
              `rounded px-3 py-2 transition ${
                isActive ? "bg-[#34495e]" : "hover:bg-[#34495e]"
              }`
            }
          >
            Logs
          </NavLink>
        </nav>
      </aside>

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 p-8 overflow-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
}
