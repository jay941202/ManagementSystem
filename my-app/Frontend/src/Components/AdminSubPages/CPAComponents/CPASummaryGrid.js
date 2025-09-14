import React from "react";

export default function CPASummaryGrid({ employees, summaryData }) {
  const totals = employees
    .filter((emp) => emp.Active)
    .reduce(
      (acc, emp) => {
        acc.totalHourly += Number(summaryData[emp._id]?.totalHourly || 0);
        acc.totalDays += Number(summaryData[emp._id]?.totalDays || 0);
        acc.totalTip += Number(summaryData[emp._id]?.totalTip || 0);
        acc.grandTotal +=
          Number(summaryData[emp._id]?.totalHourly || 0) +
          Number(summaryData[emp._id]?.totalTip || 0);
        return acc;
      },
      { totalHourly: 0, totalDays: 0, totalTip: 0, grandTotal: 0 }
    );

  return (
    <div className="overflow-auto border rounded">
      <div className="grid grid-cols-8 auto-rows-min border-b">
        <div className="border p-2 font-bold text-center">Name</div>
        <div className="border p-2 font-bold text-center">Hourly</div>
        <div className="border p-2 font-bold text-center">Total Shifts</div>
        <div className="border p-2 font-bold text-center">Total Hours</div>
        <div className="border p-2 font-bold text-center">T. Hourly Pay</div>
        <div className="border p-2 font-bold text-center">Total Tip</div>
        <div className="border p-2 font-bold text-center">Grand Total</div>
        <div className="border p-2 font-bold text-center">Hourly Avg</div>
      </div>

      {employees
        .filter((emp) => emp.Active)
        .sort((a, b) => {
          const aTotal =
            Number(summaryData[a._id]?.totalHourly || 0) +
            Number(summaryData[a._id]?.totalTip || 0);
          const bTotal =
            Number(summaryData[b._id]?.totalHourly || 0) +
            Number(summaryData[b._id]?.totalTip || 0);
          return bTotal - aTotal;
        })
        .map((emp) => (
          <div
            key={emp._id}
            className="grid grid-cols-8 auto-rows-min border-t"
          >
            <div className="border p-2 text-center">{emp.name}</div>
            <div className="border p-2 text-center">${emp.hourlyPay}</div>
            <div className="border p-2 text-center">
              {summaryData[emp._id]?.totalDays || 0}
            </div>
            <div className="border p-2 text-center">
              {summaryData[emp._id]?.totalHours.toFixed(2) || 0}h
            </div>
            <div className="border p-2 text-center">
              ${summaryData[emp._id]?.totalHourly.toFixed(2) || 0}
            </div>
            <div className="border p-2 text-center">
              ${summaryData[emp._id]?.totalTip.toFixed(2) || 0}
            </div>
            <div className="border p-2 text-center">
              $
              {(
                Number(summaryData[emp._id]?.totalTip || 0) +
                Number(summaryData[emp._id]?.totalHourly || 0)
              ).toFixed(2)}
            </div>
            <div className="border p-2 text-center">
              $
              {(
                (Number(summaryData[emp._id]?.totalTip || 0) +
                  Number(summaryData[emp._id]?.totalHourly || 0)) /
                (Number(summaryData[emp._id]?.totalHours) || 1)
              ).toFixed(2)}
              /h
            </div>
          </div>
        ))}

      <div className="grid grid-cols-8 auto-rows-min border-t font-bold bg-gray-100">
        <div className="border p-2 text-center">Total</div>
        <div className="border p-2 text-center">-</div>
        <div className="border p-2 text-center">{totals.totalDays}</div>
        <div className="border p-2 text-center">-</div>
        <div className="border p-2 text-center">
          {totals.totalHourly.toFixed(2)}
        </div>
        <div className="border p-2 text-center">
          {totals.totalTip.toFixed(2)}
        </div>
        <div className="border p-2 text-center">
          {totals.grandTotal.toFixed(2)}
        </div>
        <div className="border p-2 text-center">-</div>
      </div>
    </div>
  );
}
