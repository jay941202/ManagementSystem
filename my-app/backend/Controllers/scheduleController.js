const Schedule = require("../models/scheduleModel");

exports.confirmShift = async (req, res) => {
  try {
    const { date, shift, employees } = req.body;

    let schedule = await Schedule.findOne({ date });
    if (!schedule) {
      schedule = new Schedule({ date });
    }

    const existingShift = schedule[shift] || {
      employees: [],
      scheduleConfirmed: false,
    };

    const existingMap = {};
    (existingShift.employees || []).forEach((emp) => {
      existingMap[emp.employee.toString()] = emp;
    });

    const mergedEmployees = employees.map((emp) => {
      if (existingMap[emp.employee]) {
        return existingMap[emp.employee];
      } else {
        return { ...emp, clockIn: null, clockOut: null };
      }
    });

    schedule[shift] = {
      ...existingShift,
      employees: mergedEmployees,
      scheduleConfirmed: true,
    };

    await schedule.save();
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm shift" });
  }
};

exports.getScheduleList = async (req, res) => {
  try {
    const latest100 = await Schedule.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .populate("AM.employees.employee", "name TipPercentage Active number")
      .populate("PM.employees.employee", "name TipPercentage Active number");

    await Schedule.deleteMany({
      _id: { $nin: latest100.map((s) => s._id) },
    });

    res.json(latest100);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

exports.confirmTip = async (req, res) => {
  try {
    const { date, shift, tipTotal } = req.body;

    let schedule = await Schedule.findOne({ date });
    if (!schedule) {
      schedule = new Schedule({ date });
    }

    const existingShift = schedule[shift] || {};
    schedule[shift] = {
      ...existingShift,
      tipTotal,
      tipConfirmed: true,
      employees: existingShift.employees || [],
    };

    await schedule.save();
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm tip" });
  }
};

exports.clockInOut = async (req, res) => {
  function getWorkday(date = new Date()) {
    const d = new Date(date.getTime() - 4 * 60 * 60 * 1000);
    if (d.getHours() < 3) d.setDate(d.getDate() - 1);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  try {
    const { shift, employeeId, type } = req.body;
    const workday = getWorkday();
    const schedule = await Schedule.findOne({ date: workday })
      .populate("AM.employees.employee", "name TipPercentage Active number")
      .populate("PM.employees.employee", "name TipPercentage Active number");

    if (!schedule) return res.status(404).json({ error: "Schedule not found" });

    const employees = schedule[shift]?.employees || [];
    const targetEmployee = employees.find(
      (e) => e.employee._id.toString() === employeeId
    );
    console.log(employees);
    console.log(targetEmployee);
    console.log("Server Date:", new Date());
    console.log("Calculated workday:", getWorkday());

    if (!targetEmployee)
      return res.status(404).json({ error: "Employee not found" });

    const now = new Date();
    if (type === "Clock In") targetEmployee.clockIn = now;
    if (type === "Clock Out") targetEmployee.clockOut = now;

    await schedule.save();

    res.json({
      employee: targetEmployee.employee.name,
      type,
      time: now,
      workday,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clock in/out" });
  }
};
