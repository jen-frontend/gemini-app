import "dotenv/config";
import express from "express";
import chatRouter from "./routes/chatRouter";
import geminiStreamRouter from "./routes/geminiStreamRouter";

const app = express();
const port = process.env.PORT || 3001;

app.use("/api", chatRouter);
app.use("/api", geminiStreamRouter);
app.get("/api/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
