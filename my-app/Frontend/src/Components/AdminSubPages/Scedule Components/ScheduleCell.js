import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

export default function ScheduleCell({
  dateStr,
  dayData,
  handleChange,
  handleConfirm,
  handleEdit,
  employeesList,
}) {
  return (
    <div className="h-[296px] min-w-[120px] border border-gray-500 rounded-xl bg-white shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
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
              selectedDate={new Date(dateStr)}
              isConfirmed={isConfirmed}
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
                className={`mt-1 text-xs rounded px-3 py-1 ${
                  shiftData.employees.length === 0 && shiftData
                    ? "bg-gray-300 text-gray-600"
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
