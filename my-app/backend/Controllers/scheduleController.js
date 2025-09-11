const Schedule = require("../models/scheduleModel");

exports.confirmShift = async (req, res) => {
  try {
    const { date, shift, employees } = req.body;

    let schedule = await Schedule.findOne({ date });
    if (!schedule) {
      schedule = new Schedule({ date });
    }
    const existingShift = schedule[shift] || {};

    schedule[shift] = {
      ...existingShift,
      employees,
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
  try {
    const { date, shift, employeeId, type } = req.body;
    const schedule = await Schedule.findOne({ date });
    if (!schedule) return res.status(404).json({ error: "Schedule not found" });

    const employees = schedule[shift]?.employees || [];
    const targetEmployee = employees.find(
      (e) => e.employee._id.toString() === employeeId
    );

    if (!targetEmployee)
      return res.status(404).json({ error: "Employee not found" });

    if (type === "Clock In") targetEmployee.clockIn = new Date();
    if (type === "Clock Out") targetEmployee.clockOut = new Date();

    await schedule.save();
    res.json({
      employee: targetEmployee.employee.name,
      type,
      time:
        type === "Clock In" ? targetEmployee.clockIn : targetEmployee.clockOut,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to clock in/out" });
  }
};
