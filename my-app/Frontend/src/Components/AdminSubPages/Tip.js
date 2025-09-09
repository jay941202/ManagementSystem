import React, { useState, useEffect } from "react";
import TipCell from "./TipSubPages/TipCell";
import API from "../../API/api";

export default function Tip() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const startDay = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0);

  const thisMonth = [];
  for (let i = 0; i < startDay; i++) thisMonth.push(null);
  for (let i = 1; i <= endDate.getDate(); i++) {
    thisMonth.push(new Date(year, month, i));
  }

  const [tip, setTip] = useState({});

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/schedule/tipList", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mappedSchedule = {};
        (res.data || []).forEach((item) => {
          const key = item.date;

          const mapShift = (shiftData) => ({
            tipTotal: shiftData?.tipTotal ?? null,
            tipConfirmed: shiftData?.tipConfirmed ?? false,
          });

          mappedSchedule[key] = {
            AM: mapShift(item.AM || {}),
            PM: mapShift(item.PM || {}),
          };
        });

        setTip(mappedSchedule);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSchedule();
  }, [year, month]);

  const handleConfirm = async (dateStr, shift) => {
    const dayData = tip[dateStr] || {
      AM: { tipTotal: null, tipConfirmed: false },
      PM: { tipTotal: null, tipConfirmed: false },
    };
    const shiftData = dayData[shift];
    if (shiftData.tipTotal == null || shiftData.tipTotal === 0) return;

    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/schedule/confirmTip",
        { date: dateStr, shift, tipTotal: shiftData.tipTotal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTip((prev) => ({
        ...prev,
        [dateStr]: {
          ...dayData,
          [shift]: {
            tipTotal: shiftData.tipTotal,
            tipConfirmed: true,
          },
        },
      }));
    } catch (err) {
      console.error("Failed to confirm tip", err);
    }
  };

  const handleChange = (dateStr, shift, value) => {
    setTip((prev) => {
      const dayData = prev[dateStr] || {
        AM: { tipTotal: null, tipConfirmed: false },
        PM: { tipTotal: null, tipConfirmed: false },
      };
      return {
        ...prev,
        [dateStr]: {
          ...dayData,
          [shift]: {
            tipTotal: value,
            tipConfirmed: dayData[shift]?.tipConfirmed || false,
          },
        },
      };
    });
  };

  const handleEdit = (dateStr, shift) => {
    setTip((prev) => {
      const dayData = prev[dateStr] || {};
      return {
        ...prev,
        [dateStr]: {
          ...dayData,
          [shift]: {
            ...dayData[shift],
            tipConfirmed: false,
          },
        },
      };
    });
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Tip Calendar</h2>

      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={() => {
            if (month === 0) {
              setMonth(11);
              setYear(year - 1);
            } else {
              setMonth(month - 1);
            }
          }}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          ◀
        </button>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded px-3 py-1"
        >
          {monthNames.map((m, idx) => (
            <option key={idx} value={idx}>
              {m} {year}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            if (month === 11) {
              setMonth(0);
              setYear(year + 1);
            } else {
              setMonth(month + 1);
            }
          }}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-center text-sm font-bold text-gray-1000 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
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
            AM: { tipTotal: null, tipConfirmed: false },
            PM: { tipTotal: null, tipConfirmed: false },
          };
          return (
            <TipCell
              key={index}
              dateStr={dateStr}
              dayData={dayData}
              handleConfirm={handleConfirm}
              handleChange={handleChange}
              handleEdit={handleEdit}
            />
          );
        })}
      </div>
    </div>
  );
}
