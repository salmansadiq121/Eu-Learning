import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();
import morgan from "morgan";
import dotenv from "dotenv";
import { ErrorMiddleware } from "./middleware/error";
import UserRoute from "./routes/userRoutes";
import CourseRoute from "./routes/courseRoute";
import OrderRoute from "./routes/orderRoute";
import NotificationRoute from "./routes/notificationRoute";
import AnalyticsRoute from "./routes/analyticsRoute";
import LayoutRoute from "./routes/layoutRoute";
import { rateLimit } from "express-rate-limit";

// Configure
dotenv.config();

// Body Parser
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

// Cookies Parser
app.use(cookieParser());

// Cross Origin Resource sharing
app.use(
  cors({
    origin: [`http://localhost:3000`],
    credentials: true,
  })
);

// Api Requiest Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// APIs Routes
app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/course", CourseRoute);
app.use("/api/v1/order", OrderRoute);
app.use("/api/v1/notification", NotificationRoute);
app.use("/api/v1/analytics", AnalyticsRoute);
app.use("/api/v1/layout", LayoutRoute);

// Rest API
app.use("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    success: true,
    message: "Server is running!",
  });
});

// Unknown Route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route  ${req.originalUrl} not found!`) as any;
  (res.statusCode = 404), next(err);
});

// Rate Limit Middleware
app.use(limiter);

// Error Middleware
app.use(ErrorMiddleware);
