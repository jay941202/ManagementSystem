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

  const calculateShiftValues = (shift, emp) => {
    if (!shift?.employees) return { hourly: null, tip: null };

    const target = shift.employees.find(
      (e) => String(e.employee?._id) === String(emp._id)
    );
    if (!target) return { hourly: null, tip: null };

    let hourly = 0;
    if (target.clockIn && target.clockOut) {
      hourly =
        ((new Date(target.clockOut) - new Date(target.clockIn)) /
          (1000 * 60 * 60)) *
        emp.hourlyPay;
    }

    const totalTipPercentage = shift.employees.reduce(
      (sum, e) => sum + (e.employee?.TipPercentage || 0),
      0
    );
    const empPercentage = target.employee?.TipPercentage || 0;
    const tip =
      totalTipPercentage > 0
        ? (empPercentage / totalTipPercentage) * (shift.tip || 0)
        : 0;

    return {
      hourly: Number(hourly.toFixed(2)),
      tip: tip === 0 ? 0 : Number(tip.toFixed(2)),
    };
  };

  useEffect(() => {
    const summary = {};
    employees.forEach((emp) => {
      let totalDays = 0;
      let totalHourly = 0;
      let totalTip = 0;

      dateRange.forEach((date) => {
        const key = `${date.getMonth() + 1}/${date.getDate()}`;
        const shifts = [
          scheduleData[key]?.AM || {},
          scheduleData[key]?.PM || {},
        ];

        shifts.forEach((shift) => {
          const target = shift.employees?.find(
            (e) => String(e.employee?._id) === String(emp._id)
          );
          if (target) {
            totalDays += 1;
            const { hourly, tip } = calculateShiftValues(shift, emp);
            totalHourly += parseFloat(hourly);
            totalTip += parseFloat(tip);
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

        {dateRange.map((date) => (
          <div
            key={date}
            className="border p-1 text-center font-semibold col-span-4"
          >
            {`${date.getMonth() + 1}/${date.getDate()}`}
          </div>
        ))}

        {dateRange.map((_, idx) => (
          <React.Fragment key={idx}>
            <div className="border text-center col-span-2 flex items-center justify-center">
              Open
            </div>
            <div className="border text-center col-span-2 flex items-center justify-center">
              Close
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

            {dateRange.map((date) => {
              const key = `${date.getMonth() + 1}/${date.getDate()}`;
              const shifts = [
                scheduleData[key]?.AM || {},
                scheduleData[key]?.PM || {},
              ];

              return shifts.map((shift, i) => {
                const { hourly, tip } = calculateShiftValues(shift, emp);
                return (
                  <React.Fragment key={`${key}-${i}`}>
                    <div
                      className={` border p-1 text-center ${
                        hourly ? "bg-twohas text-white" : "text-white"
                      }`}
                    >
                      {hourly ?? "-"}
                    </div>
                    <div
                      className={` border p-1 text-center ${
                        tip ? "bg-twohas text-white" : "text-white"
                      }`}
                    >
                      {tip ?? "-"}
                    </div>
                  </React.Fragment>
                );
              });
            })}
          </div>
        ))}
    </div>
  );
}
