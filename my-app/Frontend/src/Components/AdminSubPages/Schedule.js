import React, { useState, useEffect, useRef } from "react";
import ScheduleCell from "./Scedule Components/ScheduleCell";
import API from "../../API/api";
import ScheduleTableByEmp from "./Scedule Components/ScheduleTableByEmp";

export default function Schedule() {
  const today = new Date();
  const todayDay = today.getDay();
  const diffToMonday = todayDay === 0 ? -6 : 1 - todayDay;

  const startDateObj = new Date(today);
  startDateObj.setDate(today.getDate() + diffToMonday);

  const printedDays = [];
  for (let i = 0; i < 21; i++) {
    const date = new Date(startDateObj);
    date.setDate(startDateObj.getDate() + i);
    printedDays.push({ dateObj: date });
  }

  const [schedule, setSchedule] = useState({});
  const [employeesList, setEmployeesList] = useState([]);

  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/employee/employeeList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployeesList((res.data || []).filter((emp) => emp.Active));
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/schedule/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const mappedSchedule = {};
      (res.data || []).forEach((item) => {
        const key = item.date;
        const mapShift = (shiftData) => ({
          employees: (shiftData?.employees || []).map((e) => e.employee),
          scheduleConfirmed: shiftData?.scheduleConfirmed || false,
        });

        mappedSchedule[key] = {
          AM: mapShift(item.AM),
          PM: mapShift(item.PM),
        };
      });
      setSchedule(mappedSchedule);
    } catch (err) {
      console.error("Failed to fetch schedule", err);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchSchedule();
  }, []);

  const handleChange = (dateStr, shift, selectedEmployees) => {
    setSchedule((prev) => {
      const dayData = prev[dateStr] || {
        AM: { employees: [], scheduleConfirmed: false },
        PM: { employees: [], scheduleConfirmed: false },
      };
      return {
        ...prev,
        [dateStr]: {
          ...dayData,
          [shift]: { ...dayData[shift], employees: selectedEmployees },
        },
      };
    });
  };

  const handleEdit = (dateStr, shift) => {
    setSchedule((prev) => {
      const dayData = prev[dateStr] || {};
      const shiftData = dayData[shift] || { employees: [] };
      return {
        ...prev,
        [dateStr]: {
          ...dayData,
          [shift]: { ...shiftData, scheduleConfirmed: false },
        },
      };
    });
  };

  const handleConfirm = async (dateStr, shift) => {
    setSchedule((prev) => {
      const dayData = prev[dateStr] || {};
      const shiftData = dayData[shift] || { employees: [] };
      return {
        ...prev,
        [dateStr]: {
          ...dayData,
          [shift]: { ...shiftData, scheduleConfirmed: true },
        },
      };
    });

    try {
      const token = localStorage.getItem("token");
      const selectedEmployees = schedule[dateStr]?.[shift]?.employees || [];
      const formattedEmployees = selectedEmployees.map((emp) => ({
        employee: emp._id,
        clockIn: null,
        clockOut: null,
      }));

      await API.post(
        "/schedule/confirm",
        { date: dateStr, shift, employees: formattedEmployees },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Schedule confirm failed:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-gray-50 rounded-lg shadow-lg space-y-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-center">Scheduler</h2>

      <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 sm:gap-4 text-center text-sm font-bold text-gray-700">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div
            key={d}
            className="py-2 sm:py-3 bg-gray-100 rounded-md shadow-sm"
          >
            {d}
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 sm:gap-4 text-sm">
          {printedDays.map(({ dateObj }, index) => {
            const dateStr = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
            const dayData = schedule[dateStr] || {};
            return (
              <ScheduleCell
                key={index}
                dateStr={dateStr}
                dayData={dayData}
                handleChange={handleChange}
                handleConfirm={handleConfirm}
                handleEdit={handleEdit}
                employeesList={employeesList}
              />
            );
          })}
        </div>
      </div>

      <div className="w-full overflow-auto mt-2">
        <ScheduleTableByEmp employeesList={employeesList} schedule={schedule} />
      </div>
    </div>
  );
}
