import express, { json } from "express";
import * as dotenv from "dotenv";
import connectDB from "./database.js";
import tutorialRouter from "./route/tutorial.js";
import imageRouter from "./route/image.js";
import commentRouter from "./route/comment.js";

// Định nghĩa 1 webserver
const app = express();

// Kích hoạt middleware cho phép Express server làm việc với dữ liệu JSON
app.use(json()); // middleware

// basic auth
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    next(err);
    return;
  }
  const auth = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  const user = auth[0];
  const pass = auth[1];
  if (user === "admin" && pass === "123") {
    next();
  } else {
    const err = new Error("You are not authenticated!");
    res.setHeader("WWW-Authenticate", "Basic");
    err.status = 401;
    next(err);
  }
}

app.use("/", auth, (req, res) => {
  res.send("Welcome to Home page!");
});

app.use("/tutorials", tutorialRouter);
app.use("/images", imageRouter);
app.use("/comment", commentRouter);
const port = process.env.PORT || 8080;

app.listen(port, async () => {
  connectDB();
  console.log(`Web server running on: http://localhost:${port}`);
});
