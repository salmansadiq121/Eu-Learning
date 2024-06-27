"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const notificationController_1 = require("../controller/notificationController");
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
// Get Notification
router.get("/get-notification", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), notificationController_1.getNotification);
// Update Notification Status
router.put("/update-notification/:id", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), notificationController_1.updateNotificationStatus);
exports.default = router;
