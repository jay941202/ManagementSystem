require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

const client = new MongoClient(process.env.MONGO_URI);

app.use(express.json());

// MongoDB 연결
async function start() {
  try {
    await client.connect();
    console.log("✅ MongoDB 연결 성공");

    app.listen(port, () => {
      console.log(`🚀 서버 실행 중: http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB 연결 실패:", err);
  }
}

start();
