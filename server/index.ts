import "dotenv/config";
import express from "express";
import chatRouter from "./routes/chatRouter";
import geminiStreamRouter from "./routes/geminiStreamRouter";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // JSON 바디 파싱
app.use("/api", geminiStreamRouter);
app.use("/api", chatRouter);
app.get("/api/hello", (req, res) => {
  res.json({ message: "hello react" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
