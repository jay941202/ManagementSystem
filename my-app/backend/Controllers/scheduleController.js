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
    const schedules = await Schedule.find()
      .populate("AM.employees.employee", "name TipPercentage Active")
      .populate("PM.employees.employee", "name TipPercentage Active");

    res.json(schedules);
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
