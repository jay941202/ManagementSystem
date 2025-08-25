import React, { useEffect } from "react";

export default function CPAEmployeeGrid({
  employees,
  scheduleData,
  dateRange,
  onSummaryCalculated,
}) {
  const colTemplate = [
    "minmax(120px, 1fr)",
    "minmax(80px, 1fr)",
    "minmax(100px, 1fr)",
    ...Array(dateRange.length * 4).fill("minmax(60px, 1fr)"),
  ].join(" ");

  useEffect(() => {
    const summary = {};
    employees.forEach((emp) => {
      let totalDays = 0;
      let totalHourly = 0;
      let totalTip = 0;

      dateRange.forEach((date) => {
        const key = `${date.getMonth() + 1}/${date.getDate()}`;
        const am = scheduleData[key]?.AM || {};
        const pm = scheduleData[key]?.PM || {};

        [am, pm].forEach((shift) => {
          const target = shift.employees?.find(
            (e) => String(e.employee?._id) === String(emp._id)
          );
          if (target) {
            totalDays += 1;
            if (target.clockIn && target.clockOut) {
              const hours =
                (new Date(target.clockOut) - new Date(target.clockIn)) /
                (1000 * 60 * 60);
              totalHourly += hours * emp.hourlyPay;
            }
            const totalTipPercentage = shift.employees?.reduce(
              (sum, e) => sum + (e.employee?.TipPercentage || 0),
              0
            );
            const empPercentage = target.employee?.TipPercentage || 0;
            const tipShare =
              totalTipPercentage > 0
                ? (empPercentage / totalTipPercentage) * (shift.tip || 0)
                : 0;
            totalTip += tipShare;
          }
        });
      });

      summary[emp._id] = {
        totalDays,
        totalHourly: totalHourly.toFixed(2),
        totalTip: totalTip.toFixed(2),
      };
    });

    onSummaryCalculated(summary);
  }, [employees, scheduleData, dateRange]);

  return (
    <div className="overflow-auto border rounded">
      <div
        className="grid auto-rows-min border-b"
        style={{ gridTemplateColumns: colTemplate }}
      >
        <div className="border p-2 row-span-3 font-bold text-center">Name</div>
        <div className="border p-2 row-span-3 font-bold text-center">
          Hourly
        </div>
        <div className="border p-2 row-span-3 font-bold text-center">
          Tax Report
        </div>

        {dateRange.map((date, idx) => (
          <div
            key={idx}
            className="border p-1 text-center font-semibold col-span-4"
          >
            {`${date.getMonth() + 1}/${date.getDate()}`}
          </div>
        ))}

        {dateRange.map((_, idx) => (
          <React.Fragment key={idx}>
            <div className="border text-center col-span-2 flex items-center justify-center">
              AM
            </div>
            <div className="border text-center col-span-2 flex items-center justify-center">
              PM
            </div>
          </React.Fragment>
        ))}

        {dateRange.map((_, idx) => (
          <React.Fragment key={idx}>
            <div className="border text-center flex items-center justify-center">
              Hourly
            </div>
            <div className="border text-center flex items-center justify-center">
              Tip
            </div>
            <div className="border text-center flex items-center justify-center">
              Hourly
            </div>
            <div className="border text-center flex items-center justify-center">
              Tip
            </div>
          </React.Fragment>
        ))}
      </div>

      {employees
        .filter((emp) => emp.Active)
        .map((emp) => (
          <div
            key={emp._id}
            className="grid auto-rows-min border-t"
            style={{ gridTemplateColumns: colTemplate }}
          >
            <div className="border p-2 row-span-4 text-center">{emp.name}</div>
            <div className="border p-2 row-span-4 text-center">
              {emp.hourlyPay}
            </div>
            <div className="border p-2 row-span-4 text-center">
              {emp.taxReport || "W-2"}
            </div>

            {dateRange.map((date, idx) => {
              const key = `${date.getMonth() + 1}/${date.getDate()}`;
              const am = scheduleData[key]?.AM || {};
              const pm = scheduleData[key]?.PM || {};

              const tipCal = (shift, emp) => {
                const totalTip = shift.tip || 0;
                const employees = shift.employees || [];
                const target = employees.find(
                  (e) => String(e.employee?._id) === String(emp._id)
                );
                if (!target) return 0;
                const totalTipPercentage = employees.reduce(
                  (total, e) => total + (e.employee?.TipPercentage || 0),
                  0
                );
                const empPercentage = emp.TipPercentage;
                return totalTipPercentage > 0
                  ? ((empPercentage / totalTipPercentage) * totalTip).toFixed(2)
                  : 0;
              };

              const hourlyCal = (shift, emp) => {
                if (!shift?.employees || !Array.isArray(shift.employees))
                  return 0;
                const target = shift.employees.find(
                  (e) => String(e.employee?._id) === String(emp._id)
                );
                if (!target || !target.clockIn || !target.clockOut) return 0;
                const startTime = new Date(target.clockIn);
                const outTime = new Date(target.clockOut);
                return (
                  ((outTime - startTime) / (1000 * 60 * 60)) * emp.hourlyPay
                );
              };

              return (
                <React.Fragment key={idx}>
                  <div className="border p-1 text-center">
                    {hourlyCal(am, emp) || 0}
                  </div>
                  <div className="border p-1 text-center">
                    {tipCal(am, emp) || 0}
                  </div>
                  <div className="border p-1 text-center">
                    {hourlyCal(pm, emp) || 0}
                  </div>
                  <div className="border p-1 text-center">
                    {tipCal(pm, emp) || 0}
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        ))}
    </div>
  );
}
