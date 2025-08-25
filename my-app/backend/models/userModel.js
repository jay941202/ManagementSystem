const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    hourlyPay: {
      type: Number,
      required: true,
      default: 10,
    },
    Active: {
      type: Boolean,
      required: true,
      default: true,
    },
    TipPercentage: {
      type: Number,
      required: true,
      default: 0.1,
    },
    StartDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    taxReport: {
      type: String,
      required: true,
      default: "W-2",
      enum: ["1099", "W-2"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
