import React from "react";

export default function CPASummaryGrid({ employees, summaryData }) {
  return (
    <div className="overflow-auto border rounded">
      <div className="grid grid-cols-6 auto-rows-min border-b">
        <div className="border p-2 font-bold text-center">Name</div>
        <div className="border p-2 font-bold text-center">Hourly</div>
        <div className="border p-2 font-bold text-center">Total Shifts</div>
        <div className="border p-2 font-bold text-center">Total Hourly</div>
        <div className="border p-2 font-bold text-center">Total Tip</div>
        <div className="border p-2 font-bold text-center">Grand Total</div>
      </div>

      {employees
        .filter((emp) => emp.Active)
        .map((emp) => (
          <div
            key={emp._id}
            className="grid grid-cols-6 auto-rows-min border-t"
          >
            <div className="border p-2 text-center">{emp.name}</div>
            <div className="border p-2 text-center">{emp.hourlyPay}</div>
            <div className="border p-2 text-center">
              {summaryData[emp._id]?.totalDays || 0}
            </div>
            <div className="border p-2 text-center">
              {summaryData[emp._id]?.totalHourly || 0}
            </div>
            <div className="border p-2 text-center">
              {summaryData[emp._id]?.totalTip || 0}
            </div>
            <div className="border p-2 text-center">
              {(
                Number(summaryData[emp._id]?.totalTip || 0) +
                Number(summaryData[emp._id]?.totalHourly || 0)
              ).toFixed(2)}
            </div>
          </div>
        ))}
    </div>
  );
}
