require("dotenv").config();
const express = require("express");
const connectDB = require("./config/DB");
const userRouter = require("./routes/userRouter");
const employeeRouter = require("./routes/employeeRouter");
const scheduleRouter = require("./routes/scheduleRouter");
const inventoryRouter = require("./routes/InventoryRouter");
const recipeRouter = require("./routes/recipeRouter");
const summaryRouter = require("./routes/summaryRouter");
const tvRouter = require("./routes/tvRouter");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.use(
  cors({
    origin: "https://www.twohas.com",
    credentials: true,
  })
);

connectDB();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/summary", summaryRouter);
app.use("/api/tv", tvRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
