import React, { useState, useEffect } from "react";
import API from "../../API/api";
import CPAEmployeeGrid from "./CPAComponents/CPAEmployeeGrid";
import CPASummaryGrid from "./CPAComponents/CPASummaryGrid";

export default function CPA() {
  const [employees, setEmployees] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedRange, setSelectedRange] = useState(
    new Date().getDate() <= 15 ? "1-15" : "16-end"
  );
  const [scheduleData, setScheduleData] = useState({});
  const [dateRange, setDateRange] = useState([]);
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
          const dateObj = new Date(item.date);
          const key = `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
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
        console.error(err);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const year = selectedYear;
    const month = selectedMonth;
    const startDay = selectedRange === "1-15" ? 1 : 16;
    const endDay =
      selectedRange === "1-15" ? 15 : new Date(year, month + 1, 0).getDate();

    const dates = [];
    for (let d = startDay; d <= endDay; d++)
      dates.push(new Date(year, month, d));
    setDateRange(dates);
  }, [selectedYear, selectedMonth, selectedRange]);

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear - 2; y <= currentYear; y++) years.push(y);
    return years;
  };

  const employees1099 = employees.filter((emp) => emp.taxReport === "1099");
  const employeesW2 = employees.filter((emp) => emp.taxReport === "W-2");

  return (
    <div className="p-6 max-w-full mx-auto space-y-12">
      <h2 className="text-3xl font-bold mb-6 text-center">CPA</h2>

      <div className="flex gap-4 mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border rounded px-3 py-1"
        >
          {generateYears().map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border rounded px-3 py-1"
        >
          {[
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].map((m, idx) => (
            <option key={idx} value={idx}>
              {m}
            </option>
          ))}
        </select>

        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="1-15">1-15</option>
          <option value="16-end">16-End</option>
        </select>
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
    </div>
  );
}
