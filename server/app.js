// app.js
import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routers/authRoutes.js";
import UserRouter from "./routers/userRoutes.js";
import aiRouter from "./routers/aiRouter.js";

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
const router = express.Router();
router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/ai", aiRouter);

router.get('/', (req, res) => {
  res.send('Welcome to my Express app!');
});

app.use("/api", router);
app.use("/", router);

export default app;
