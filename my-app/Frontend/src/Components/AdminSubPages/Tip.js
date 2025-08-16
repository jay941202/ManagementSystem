import React, { useState } from "react";
import TipCell from "../TipSubPages/TipCell";

export default function Tip() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const startDay = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0);

  const thisMonth = [];
  for (let i = 0; i < startDay; i++) thisMonth.push(null);
  for (let i = 1; i <= endDate.getDate(); i++)
    thisMonth.push(new Date(year, month, i));

  const [tip, setTip] = useState({});

  const handleConfirm = (dateStr, shift) => {
    setTip((prev) => {
      const dayData = prev[dateStr] || {
        AM: { Tip: "", confirmed: false },
        PM: { Tip: "", confirmed: false },
      };
      const shiftData = dayData[shift];
      if (shiftData.Tip === "" || shiftData.Tip == null) return prev;

      return {
        ...prev,
        [dateStr]: {
          ...dayData,
          [shift]: {
            Tip: shiftData.Tip,
            confirmed: true,
          },
        },
      };
    });
  };

  const handleChange = (dateStr, shift, value) => {
    setTip((prev) => {
      const dayData = prev[dateStr] || {
        AM: { Tip: "", confirmed: false },
        PM: { Tip: "", confirmed: false },
      };
      return {
        ...prev,
        [dateStr]: {
          ...dayData,
          [shift]: {
            Tip: value,
            confirmed: dayData[shift]?.confirmed || false,
          },
        },
      };
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Tip Calendar</h2>
      <div className="grid grid-cols-7 gap-4 text-center text-sm font-bold text-gray-1000 mb-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="py-3 bg-gray-100 rounded-md shadow-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 text-sm">
        {thisMonth.map((day, index) => {
          if (!day) return <div key={index}></div>;
          const dateStr = `${day.getMonth() + 1}/${day.getDate()}`;
          const dayData = tip[dateStr] || {
            AM: { Tip: "", confirmed: false },
            PM: { Tip: "", confirmed: false },
          };
          return (
            <TipCell
              key={index}
              dateStr={dateStr}
              dayData={dayData}
              handleConfirm={handleConfirm}
              handleChange={handleChange}
            />
          );
        })}
      </div>
    </div>
  );
}
