import React from "react";

export default function TipCell({
  dateStr,
  dayData,
  handleConfirm,
  handleChange,
}) {
  return (
    <div className="h-64 min-w-[120px] border border-gray-500 rounded-xl bg-white shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow">
      <div className="px-3 pt-1 text-right text-s font-bold text-red-500 h-6 select-none">
        {dateStr}
      </div>
      {["AM", "PM"].map((shift) => {
        const shiftData = dayData[shift] || { Tip: null, confirmed: false };
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
            {!isConfirmed ? (
              <input
                type="number"
                placeholder="Enter tip"
                value={shiftData.Tip ?? ""}
                onChange={(e) =>
                  handleChange(dateStr, shift, Number(e.target.value))
                }
                className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            ) : (
              <div className="w-full px-2 py-1 text-sm border rounded-md bg-gray-100 text-white bg-twohas">
                $ {shiftData.Tip}
              </div>
            )}

            {!isConfirmed && (
              <button
                onClick={() => handleConfirm(dateStr, shift)}
                disabled={!shiftData.Tip || shiftData.Tip === 0}
                className={`mt-1 text-xs rounded px-3 py-1 transition
                ${
                  !shiftData.Tip || shiftData.Tip === 0
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
