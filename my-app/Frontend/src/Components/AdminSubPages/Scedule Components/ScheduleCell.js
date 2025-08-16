import React from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

export default function ScheduleCell({
  dateStr,
  dayData,
  handleChange,
  handleConfirm,
}) {
  return (
    <div className="h-64 min-w-[120px] border border-gray-500 rounded-xl bg-white shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div className="px-3 pt-1 text-right text-s font-bold text-red-500 h-6 select-none">
        {dateStr}
      </div>

      {["AM", "PM"].map((shift) => {
        const shiftData = dayData[shift] || {
          employees: [],
          confirmed: false,
        };
        const isConfirmed = shiftData.confirmed;

        return (
          <div
            key={shift}
            className={`flex-1 border-t px-3 py-2 transition flex flex-col gap-2 rounded-b-md ${
              isConfirmed ? "bg-twohas text-white" : "hover:bg-blue-50"
            }`}
          >
            <div className="text-xs font-semibold select-none">
              {shift === "AM" ? "Morning" : "Night"}
            </div>

            <MultiSelectDropdown
              options={[
                "홍길동",
                "김민수",
                "최유진",
                "박서준",
                "이서윤",
                "강민재",
                "조민호",
              ]}
              selected={shiftData.employees}
              onChange={(selected) => handleChange(dateStr, shift, selected)}
              disabled={isConfirmed}
            />

            {!isConfirmed && (
              <button
                onClick={() => handleConfirm(dateStr, shift)}
                disabled={shiftData.employees.length === 0}
                className={`mt-1 text-xs rounded px-3 py-1 transition 
                ${
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
