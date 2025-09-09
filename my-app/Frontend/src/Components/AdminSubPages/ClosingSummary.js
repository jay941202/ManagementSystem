import React, { useEffect, useState } from "react";
import API from "../../API/api";

const formatTime = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function ClosingSummary() {
  const [cashCountList, setCashCountList] = useState([]);
  const [refundList, setRefundList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [employee, setEmployee] = useState([]);

  const fetchCashCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/summary/cashCountList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCashCountList(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/employee/employeeList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployee(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRefund = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/summary/refundList", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefundList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/schedule/list", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendanceList(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchCashCount();
    fetchRefund();
    fetchAttendance();
  }, []);

  const today = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(today.getDate() - 7);

  const flattenedAttendance = attendanceList
    .flatMap((day) => {
      const amEmployees =
        day.AM?.employees?.map((emp) => ({
          name: emp.employee.name,
          date: day.date,
          clockIn: emp.clockIn,
          clockOut: emp.clockOut,
        })) || [];
      const pmEmployees =
        day.PM?.employees?.map((emp) => ({
          name: emp.employee.name,
          date: day.date,
          clockIn: emp.clockIn,
          clockOut: emp.clockOut,
        })) || [];
      return [...amEmployees, ...pmEmployees];
    })
    .map((item) => {
      const [month, day] = item.date.split("/").map(Number);
      const year = new Date().getFullYear();
      return { ...item, dateObj: new Date(year, month - 1, day) };
    })
    .filter((item) => item.dateObj >= oneWeekAgo && item.dateObj <= today)
    .sort((a, b) => a.dateObj - b.dateObj);

  return (
    <div className="space-y-8 p-4">
      <div className="overflow-x-auto rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Refund Summary</h2>
        <table className="min-w-full table-auto border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Ticket
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Item
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Reason
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {refundList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-sm">{item.ticketNumber}</td>
                <td className="px-2 py-1 text-sm">{item.item}</td>
                <td className="px-2 py-1 text-sm">{item.reason}</td>
                <td className="px-2 py-1 text-sm">
                  {formatTime(item.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Cash Count</h2>
        <table className="min-w-full table-auto border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600 w-36 text-center">
                Timestamp
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600 w-24 text-center">
                Total
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600 text-center">
                Bills
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cashCountList.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-sm">
                  {formatTime(item.updatedAt)}
                </td>
                <td className="px-2 py-1 text-sm text-center">
                  ${item.totalAmount}
                </td>
                <td className="px-2 py-1 text-sm">
                  <table className="min-w-full table-auto border border-gray-300 bg-gray-50">
                    <thead>
                      <tr>
                        {Object.keys(item.bills).map((key) => (
                          <th key={key} className="border px-1 py-0.5 text-xs">
                            {key}$
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {Object.values(item.bills).map((value, i) => (
                          <td
                            key={i}
                            className="border px-1 py-0.5 text-center text-xs"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">
          Clock In / Clock Out Summary (Last 7 days)
        </h2>
        <table className="min-w-full table-auto border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Date
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Clock In
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Clock Out
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {flattenedAttendance.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 py-1 text-sm">{item.name}</td>
                <td className="px-2 py-1 text-sm">{item.date}</td>
                <td className="px-2 py-1 text-sm">
                  {item.clockIn ? formatTime(item.clockIn) : ""}
                </td>
                <td className="px-2 py-1 text-sm">
                  {item.clockOut ? formatTime(item.clockOut) : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="overflow-x-auto rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Unavailable Dates list</h2>
        <table className="min-w-full table-auto border border-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Start Date
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                End Date
              </th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employee.flatMap((emp) =>
              emp.unavailableDates
                .filter(
                  (ud) =>
                    new Date(ud.startDate) >= today ||
                    new Date(ud.endDate) >= today
                )
                .map((ud, idx) => (
                  <tr key={`${emp._id}`} className="hover:bg-gray-50">
                    <td className="px-2 py-1 text-sm">{emp.name}</td>
                    <td className="px-2 py-1 text-sm">
                      {ud.startDate
                        ? new Date(ud.startDate).toLocaleDateString("en-US")
                        : ""}
                    </td>
                    <td className="px-2 py-1 text-sm">
                      {ud.endDate
                        ? new Date(ud.endDate).toLocaleDateString("en-US")
                        : ""}
                    </td>
                    <td className="px-2 py-1 text-sm">{ud.reason}</td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
