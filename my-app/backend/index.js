require("dotenv").config();
const express = require("express");
const connectDB = require("./config/DB");
const userRouter = require("./routes/userRouter");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

console.log("JWT_SECRET:", process.env.JWT_SECRET);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

connectDB();

app.use(express.json());

app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
