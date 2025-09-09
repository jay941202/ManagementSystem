import React, { useState } from "react";

const generateWeekDates = (startDate) => {
  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    week.push(d);
  }
  return week;
};
function getWeekday(date) {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return weekdays[date.getDay()];
}

const today = new Date();
const todayDay = today.getDay();
const diffToMonday = todayDay === 0 ? -6 : 1 - todayDay;

const startDateObj = new Date(today);
startDateObj.setDate(today.getDate() + diffToMonday);

export default function ScheduleTableByEmp({ employeesList, schedule }) {
  const [weekDates, setWeekDates] = useState(() =>
    generateWeekDates(startDateObj)
  );

  const colTemplate = [
    "minmax(140px, 1fr)",
    ...Array(weekDates.length * 2).fill("minmax(70px, 1fr)"),
  ].join(" ");

  return (
    <div className="border rounded-lg shadow-md bg-white p-4">
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-3xl font-bold mb-4 text-center">Schedule Table</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              const prevWeekStart = new Date(
                weekDates[0].getTime() - 7 * 24 * 60 * 60 * 1000
              );
              setWeekDates(generateWeekDates(prevWeekStart));
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            ◀ Previous
          </button>
          <button
            onClick={() => {
              const nextWeekStart = new Date(
                weekDates[0].getTime() + 7 * 24 * 60 * 60 * 1000
              );
              setWeekDates(generateWeekDates(nextWeekStart));
            }}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
          >
            Next ▶
          </button>
        </div>
      </div>

      <div
        className="grid border-b border-gray-200 bg-gray-50 sticky top-0 z-10"
        style={{ gridTemplateColumns: colTemplate }}
      >
        <div className="border p-3 text-center font-semibold row-span-2 bg-gray-100">
          Name
        </div>

        {weekDates.map((date) => (
          <div
            key={date.toDateString()}
            className="border p-2 text-center font-semibold col-span-2 text-gray-700"
          >
            {`${date.getMonth() + 1}/${date.getDate()}(${getWeekday(date)})`}
          </div>
        ))}

        {weekDates.map((date) => (
          <React.Fragment key={date.toDateString() + "-shift"}>
            <div className="border text-center text-xs text-gray-500 px-1 py-1">
              Open
            </div>
            <div className="border text-center text-xs text-gray-500 px-1 py-1">
              Close
            </div>
          </React.Fragment>
        ))}
      </div>

      {employeesList &&
        employeesList.map((emp) => (
          <div
            key={emp._id}
            className="grid border-b border-gray-200 hover:bg-gray-50 transition-colors"
            style={{ gridTemplateColumns: colTemplate }}
          >
            <div className="border p-3 text-center font-medium text-gray-800">
              {emp.name}
            </div>

            {weekDates.map((date) => {
              const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
              const dayData = schedule[dateStr] || {};
              const shifts = ["AM", "PM"];

              return shifts.map((shift) => {
                const shiftData = dayData[shift] || { employees: [] };
                const isScheduled = shiftData.employees.some(
                  (e) => e._id === emp._id
                );

                return (
                  <div
                    key={emp._id + "-" + dateStr + "-" + shift}
                    className="border flex items-center justify-center"
                    style={{ height: "50px" }}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold 
                        ${isScheduled ? "bg-green-500" : ""}`}
                    ></span>
                  </div>
                );
              });
            })}
          </div>
        ))}
    </div>
  );
}
