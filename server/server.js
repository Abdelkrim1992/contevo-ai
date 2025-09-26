// server.js
import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routers/authRoutes.js";
import UserRouter from "./routers/userRoutes.js";
import serverless from "serverless-http";

const app = express();

app.use(
  cors({
    origin: ENV.FRONTEND_APP_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Hello World from Vercel 🚀");
});

// ✅ Export for Vercel instead of app.listen
export default serverless(app);
