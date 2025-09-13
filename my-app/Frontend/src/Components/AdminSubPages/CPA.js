import React, { useState, useEffect } from "react";
import API from "../../API/api";
import CPAEmployeeGrid from "./CPAComponents/CPAEmployeeGrid";
import CPASummaryGrid from "./CPAComponents/CPASummaryGrid";

export default function CPA() {
  const [employees, setEmployees] = useState([]);
  const [scheduleData, setScheduleData] = useState({});
  const [startEndDate, setStartEndDate] = useState({
    startDate: "",
    endDate: "",
  });

  const today = new Date();
  const todayDay = today.getDay();
  const diffToMonday = todayDay === 0 ? -6 : 1 - todayDay;
  const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
  const initialDateRange = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i + diffToMonday);
    return formatDate(date);
  });

  const [dateRange, setDateRange] = useState(initialDateRange);
  const [summaryData, setSummaryData] = useState({});

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/employee/employeeList", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(res.data);

        const scheduleRes = await API.get("/schedule/tipList", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mappedSchedule = {};
        scheduleRes.data.forEach((item) => {
          const key = item.date;
          mappedSchedule[key] = {
            AM: {
              employees: item.AM?.employees || [],
              tip: item.AM?.tipTotal || 0,
            },
            PM: {
              employees: item.PM?.employees || [],
              tip: item.PM?.tipTotal || 0,
            },
          };
        });

        setScheduleData(mappedSchedule);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStartEndDate((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!startEndDate.startDate || !startEndDate.endDate) return;

    const parseDate = (str) => {
      const [year, month, day] = str.split("-").map(Number);
      return new Date(year, month - 1, day);
    };

    const start = parseDate(startEndDate.startDate);
    const end = parseDate(startEndDate.endDate);

    const dates = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(formatDate(new Date(d)));
    }

    setDateRange(dates);
  }, [startEndDate]);

  const employees1099 = employees.filter((emp) => emp.taxReport === "1099");
  const employeesW2 = employees.filter((emp) => emp.taxReport === "W-2");

  return (
    <div className="p-6 max-w-full mx-auto space-y-12">
      <h2 className="text-3xl font-bold mb-6 text-center">CPA</h2>

      <div className="flex items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={startEndDate.startDate}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-600">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={startEndDate.endDate}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
          />
        </div>
      </div>

      <CPAEmployeeGrid
        employees={employees}
        scheduleData={scheduleData}
        dateRange={dateRange}
        onSummaryCalculated={(summary) => setSummaryData(summary)}
      />

      <div>
        <h3 className="text-xl font-bold mb-2">1099 Employees Summary</h3>
        <CPASummaryGrid employees={employees1099} summaryData={summaryData} />
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2">W-2 Employees Summary</h3>
        <CPASummaryGrid employees={employeesW2} summaryData={summaryData} />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">All Employees</h3>
        <CPASummaryGrid employees={employees} summaryData={summaryData} />
      </div>
    </div>
  );
}
