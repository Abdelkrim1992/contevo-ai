// server.js
import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routers/authRoutes.js";
import UserRouter from "./routers/userRoutes.js";
import aiRouter from "./routers/aiRouter.js";
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
app.use("/ai", aiRouter);

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to my Express app!'); // Or render a view, send JSON, etc.
});


// ✅ Export for Vercel instead of app.listen
export default serverless(app);
