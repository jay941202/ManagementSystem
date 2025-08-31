import React, { useEffect, useState } from "react";
import API from "../../../API/api";

export default function ClockInOut({ workday }) {
  const today = new Date().toISOString().split("T")[0];
  const [clockLogs, setClockLogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [pin, setPin] = useState("");
  const [todayEmployees, setTodayEmployees] = useState([]);

  const filterToday = (date) =>
    new Date(date).toISOString().split("T")[0] === today;

  const openModal = (type) => {
    setActionType(type);
    setIsModalOpen(true);
    setPin("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActionType("");
    setPin("");
  };
  const fetchEmployeeToday = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/schedule/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const todaySchedule = res.data.find((s) => s.date === workday);
      if (!todaySchedule) return setTodayEmployees([]);

      const employees = ["AM", "PM"].flatMap(
        (shift) =>
          todaySchedule[shift]?.employees.map((e) => ({
            ...e,
            shift,
            date: workday,
          })) || []
      );

      setTodayEmployees(employees);

      const logs = employees.flatMap((e) => {
        const arr = [];
        if (e.clockIn)
          arr.push({
            employee: e.employee.name,
            type: "Clock In",
            time: e.clockIn,
          });
        if (e.clockOut)
          arr.push({
            employee: e.employee.name,
            type: "Clock Out",
            time: e.clockOut,
          });
        return arr;
      });
      setClockLogs(logs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployeeToday();
  }, []);

  const handleConfirm = async (type) => {
    try {
      const targetEmployee = todayEmployees.find(
        (e) => e.employee.number.slice(-4) === String(pin)
      );

      if (!targetEmployee) return alert("PIN Not Matched");

      const payload = {
        date: targetEmployee.date,
        shift: targetEmployee.shift,
        employeeId: targetEmployee.employee._id,
        type,
      };

      const clockRes = await API.put("/schedule/clockInOut", payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setClockLogs((prev) => [
        ...prev,
        {
          employee: targetEmployee.employee.name,
          type,
          time: clockRes.data.time,
        },
      ]);
      setIsModalOpen(false);
    } catch (err) {
      console.error("failed", err);
    }
  };
  return (
    <section>
      <h2 className="text-xl font-bold mb-4 text-twohas">Clock In / Out</h2>
      <div className="flex gap-6 mb-6">
        <button
          onClick={() => openModal("Clock In")}
          className="px-6 py-3 text-lg font-semibold bg-twohas text-white rounded-xl shadow-lg hover:bg-twohas/80 transition"
        >
          Clock In
        </button>
        <button
          onClick={() => openModal("Clock Out")}
          className="px-6 py-3 text-lg font-semibold bg-red-500 text-white rounded-xl shadow-lg hover:bg-red-600 transition"
        >
          Clock Out
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-200 text-sm rounded-lg overflow-hidden shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Employee</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {clockLogs
            .filter((log) => filterToday(log.time))
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map((log, idx) => (
              <tr key={idx} className="odd:bg-white even:bg-gray-50">
                <td className="border px-4 py-2">{log.employee}</td>
                <td className="border px-4 py-2">{log.type}</td>
                <td className="border px-4 py-2">
                  {new Date(log.time).toLocaleString()}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-twohas mb-4">
              {actionType}
            </h3>
            <input
              type="password"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter last 4 digits"
              className="w-full border px-4 py-2 rounded-lg text-center tracking-widest text-xl mb-4"
            />
            <div className="flex justify-between gap-4">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirm(actionType)}
                className="flex-1 px-4 py-2 bg-twohas text-white rounded-lg hover:bg-twohas/80"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
