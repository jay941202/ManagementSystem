const Schedule = require("../models/scheduleModel");

exports.confirmShift = async (req, res) => {
  try {
    const { date, shift, employees } = req.body;

    const isoDate = new Date(date);

    let schedule = await Schedule.findOne({ date: isoDate });
    if (!schedule) {
      schedule = new Schedule({ date: isoDate });
    }

    // 기존 shift 데이터가 있으면 가져오고 없으면 빈 객체로
    const existingShift = schedule[shift] || {};

    schedule[shift] = {
      ...existingShift,
      employees,
      confirmed: true,
    };

    await schedule.save();
    res.json(schedule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm shift" });
  }
};
