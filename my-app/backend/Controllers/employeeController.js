const User = require("../models/userModel");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch employee list" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.body;
  try {
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(400).json({ error: "User does not exists" });
    }
    await userExist.deleteOne();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server Connection Failed" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const {
      id,
      name,
      role,
      hourlyPay,
      number,
      TipPercentage,
      Active,
      StartDate,
      taxReport,
    } = req.body;

    if (!id)
      return res.status(400).json({ message: "Employee ID is required" });

    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (role !== undefined) updateFields.role = role;
    if (hourlyPay !== undefined) updateFields.hourlyPay = hourlyPay;
    if (number !== undefined) updateFields.number = number;
    if (TipPercentage !== undefined) updateFields.TipPercentage = TipPercentage;
    if (Active !== undefined) updateFields.Active = Active;
    if (StartDate !== undefined) updateFields.StartDate = StartDate;
    if (taxReport !== undefined) updateFields.taxReport = taxReport;

    const updatedEmployee = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedEmployee)
      return res.status(404).json({ message: "Employee not found" });

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const {
      name,
      role,
      hourlyPay,
      number,
      TipPercentage,
      Active,
      StartDate,
      password,
      taxReport,
    } = req.body;

    if (!name || !number || !taxReport) {
      return res
        .status(400)
        .json({ message: "Name, number, and taxReport are required" });
    }

    const tempPassword = password || String(number);

    const newEmployee = await User.create({
      name,
      role: role || "user",
      hourlyPay: hourlyPay !== undefined ? Number(hourlyPay) : 10,
      number,
      TipPercentage: TipPercentage !== undefined ? Number(TipPercentage) : 1.0,
      Active:
        Active !== undefined ? Active === true || Active === "true" : true,
      StartDate: StartDate ? new Date(StartDate) : new Date(),
      password: tempPassword,
      taxReport,
    });

    const { password: _, ...employeeData } = newEmployee.toObject();
    res.status(201).json(employeeData);
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Server error" });
  }
};
