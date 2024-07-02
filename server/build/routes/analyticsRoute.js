"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controller/userController");
const analyticsController_1 = require("../controller/analyticsController");
const router = express_1.default.Router();
// Get User Analytics
router.get("/user-analytics", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), analyticsController_1.getUserAnalytics);
// Get Courses Analytics
router.get("/courses-analytics", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), analyticsController_1.getCoursesAnalytics);
// Get Orders Analytics
router.get("/orders-analytics", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), analyticsController_1.getOrdersAnalytics);
exports.default = router;
