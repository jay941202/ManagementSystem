import React from "react";

export default function TipCell({
  dateStr,
  dayData,
  handleConfirm,
  handleChange,
  handleEdit,
}) {
  return (
    <div className="h-64 min-w-[120px] border border-gray-500 rounded-xl bg-white shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div className="px-3 pt-1 text-s font-bold text-red-500 h-6 text-right select-none">
        {dateStr}
      </div>
      {["AM", "PM"].map((shift) => {
        const shiftData = dayData[shift] || {
          tipTotal: null,
          tipConfirmed: false,
        };
        const isConfirmed = shiftData.tipConfirmed;

        return (
          <div
            key={shift}
            className={`flex-1 border-t px-3 py-2 flex flex-col gap-2 rounded-b-md transition ${
              isConfirmed ? "bg-twohas text-white" : "hover:bg-blue-50"
            }`}
          >
            <div className="text-xs font-semibold select-none">
              {shift === "AM" ? "Opening" : "Closing"}
            </div>
            {!isConfirmed ? (
              <input
                type="number"
                placeholder="Enter tip"
                value={shiftData.tipTotal ?? ""}
                onChange={(e) =>
                  handleChange(
                    dateStr,
                    shift,
                    e.target.value === "" ? null : Number(e.target.value)
                  )
                }
                className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            ) : (
              <div className="w-full px-2 py-1 text-sm border rounded-md bg-twohas text-white">
                $ {shiftData.tipTotal}
              </div>
            )}
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
                disabled={
                  shiftData.tipTotal == null || shiftData.tipTotal === 0
                }
                className={`mt-1 text-xs rounded px-3 py-1 transition ${
                  shiftData.tipTotal == null || shiftData.tipTotal === 0
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
