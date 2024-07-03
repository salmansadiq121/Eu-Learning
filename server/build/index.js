"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = require("./middleware/error");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const courseRoute_1 = __importDefault(require("./routes/courseRoute"));
const orderRoute_1 = __importDefault(require("./routes/orderRoute"));
const notificationRoute_1 = __importDefault(require("./routes/notificationRoute"));
const analyticsRoute_1 = __importDefault(require("./routes/analyticsRoute"));
const layoutRoute_1 = __importDefault(require("./routes/layoutRoute"));
// const express_rate_limit_1 = require("express-rate-limit");
// Configure dotenv
dotenv_1.default.config();
exports.app = (0, express_1.default)();
// Body Parser
exports.app.use(express_1.default.json({ limit: "50mb" }));
exports.app.use((0, morgan_1.default)("dev"));
// Cookies Parser
exports.app.use((0, cookie_parser_1.default)());
// Cross-Origin Resource Sharing (CORS)
exports.app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN?.split(",") || [
        `https://eulearning.vercel.app`,
    ],
    credentials: true,
}));
// API Request Rate Limit
// const limiter = (0, express_rate_limit_1.rateLimit)({
//     windowMs: 15 * 60 * 1000,
//     limit: 100,
//     standardHeaders: true,
//     legacyHeaders: false,
// });
// Apply the rate limiting middleware to all requests
// exports.app.use(limiter);
// APIs Routes
exports.app.use("/api/v1/auth", userRoutes_1.default);
exports.app.use("/api/v1/course", courseRoute_1.default);
exports.app.use("/api/v1/order", orderRoute_1.default);
exports.app.use("/api/v1/notification", notificationRoute_1.default);
exports.app.use("/api/v1/analytics", analyticsRoute_1.default);
exports.app.use("/api/v1/layout", layoutRoute_1.default);
// Test Route
exports.app.use("/test", (req, res, next) => {
    res.status(200).send({
        success: true,
        message: "Server is running!",
    });
});
// Handle Unknown Routes
exports.app.all("*", (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found!`);
    res.status(404);
    next(err);
});
// Error Middleware
exports.app.use(error_1.ErrorMiddleware);
