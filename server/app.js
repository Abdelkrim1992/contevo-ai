// app.js
import express from "express";
import cors from "cors";
import { ENV } from "./config/env.js";
import cookieParser from "cookie-parser";
import AuthRouter from "./routers/authRoutes.js";
import UserRouter from "./routers/userRoutes.js";
import aiRouter from "./routers/aiRouter.js";

const app = express();

const allowedOrigins = [
  ENV.FRONTEND_APP_URL,
  ENV.FRONTEND_APP_URL?.endsWith('/') ? ENV.FRONTEND_APP_URL.slice(0, -1) : `${ENV.FRONTEND_APP_URL}/`
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
