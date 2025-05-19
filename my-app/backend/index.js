require("dotenv").config();
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

const client = new MongoClient(process.env.MONGO_URI);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("서버 정상 작동 중 ✅");
});

// MongoDB 연결
async function start() {
  try {
    await client.connect();
    console.log("✅ MongoDB 연결 성공");

    // 예시: user 컬렉션 접근
    const db = client.db("your_db_name");
    const users = db.collection("users");

    app.listen(port, () => {
      console.log(`🚀 서버 실행 중: http://localhost:${port}`);
    });
  } catch (err) {
    console.error("❌ MongoDB 연결 실패:", err);
  }
}

start();
