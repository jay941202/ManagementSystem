import React, { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import API from "../../../API/api";

export default function ScheduleCell({
  dateStr,
  dayData,
  handleChange,
  handleConfirm,
  handleEdit,
}) {
  const [employeesList, setEmployeesList] = useState([]);

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/employee/employeeList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const activeEmployees = res.data.filter((emp) => emp.Active);
      setEmployeesList(activeEmployees);
    } catch (error) {
      console.error("Failed", error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <div className="h-64 min-w-[120px] border border-gray-500 rounded-xl bg-white shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div className="px-3 pt-1 text-right text-s font-bold text-red-500 h-6 select-none">
        {dateStr}
      </div>
      {["AM", "PM"].map((shift) => {
        const shiftData = dayData[shift] || {
          employees: [],
          scheduleConfirmed: false,
        };
        const isConfirmed = shiftData.scheduleConfirmed;

        return (
          <div
            key={shift}
            className={`flex-1 border-t px-3 py-2 transition flex flex-col gap-2 rounded-b-md ${
              isConfirmed ? "bg-twohas text-white" : "hover:bg-blue-50"
            }`}
          >
            <div className="text-xs font-semibold select-none">
              {shift === "AM" ? "Opening" : "Closing"}
            </div>
            <MultiSelectDropdown
              options={employeesList}
              selected={shiftData.employees}
              onChange={(selected) => handleChange(dateStr, shift, selected)}
              disabled={isConfirmed}
            />
            {isConfirmed ? (
              <button
                onClick={() => handleEdit(dateStr, shift)}
                className="mt-1 text-xs rounded px-3 py-1 bg-white text-twohas hover:brightness-110"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => handleConfirm(dateStr, shift)}
                disabled={shiftData.employees.length === 0}
                className={`mt-1 text-xs rounded px-3 py-1 ${
                  shiftData.employees.length === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-twohas text-white hover:brightness-110"
                }`}
              >
                Confirm
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
