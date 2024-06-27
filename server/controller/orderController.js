"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.createOrder = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const courseModel_1 = __importDefault(require("../models/courseModel"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const orderServices_1 = require("../services/orderServices");
// Create Order
exports.createOrder = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { courseId, payment_info } = req.body;
        const user = yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
        const courseExistingUser = user === null || user === void 0 ? void 0 : user.courses.some((course) => course._id.toString() === courseId);
        if (courseExistingUser) {
            return next(new ErrorHandler_1.default("You have already purchased this course", 400));
        }
        const course = yield courseModel_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const data = {
            courseId: course._id,
            userId: user === null || user === void 0 ? void 0 : user._id,
            payment_info,
        };
        const mailData = {
            order: {
                _id: course._id.toString().slice(0, 6),
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
            },
        };
        const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/order-confirmation.ejs"), { order: mailData });
        try {
            if (user) {
                yield (0, sendMail_1.default)({
                    email: user.email,
                    subject: "Order Confirmation",
                    template: "order-confirmation.ejs",
                    data: mailData,
                });
            }
        }
        catch (error) {
            return next(new ErrorHandler_1.default(error.message, 400));
        }
        user === null || user === void 0 ? void 0 : user.courses.push(course === null || course === void 0 ? void 0 : course._id);
        yield (user === null || user === void 0 ? void 0 : user.save());
        //   Create Admin Notification
        yield notificationModel_1.default.create({
            user: user === null || user === void 0 ? void 0 : user._id,
            title: "New Order",
            message: `You have a new order from ${course === null || course === void 0 ? void 0 : course.name}`,
        });
        if (course.purchased) {
            course.purchased += 1;
        }
        yield course.save();
        (0, orderServices_1.newOrder)(data, res, next);
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Get ALl Orders ----------- Only for Admin
exports.getAllOrders = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, orderServices_1.getAllOrderService)(res);
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
