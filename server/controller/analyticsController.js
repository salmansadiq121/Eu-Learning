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
exports.getOrdersAnalytics = exports.getCoursesAnalytics = exports.getUserAnalytics = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const analyticsGenerator_1 = require("../utils/analyticsGenerator");
const userModel_1 = __importDefault(require("../models/userModel"));
const courseModel_1 = __importDefault(require("../models/courseModel"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
// Get User Analytics
exports.getUserAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, analyticsGenerator_1.generateLast12MonthData)(userModel_1.default);
        res.status(200).send({
            success: true,
            users,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// Get Courses Analytics
exports.getCoursesAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield (0, analyticsGenerator_1.generateLast12MonthData)(courseModel_1.default);
        res.status(200).send({
            success: true,
            courses,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
// Get Orders Analytics
exports.getOrdersAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield (0, analyticsGenerator_1.generateLast12MonthData)(orderModel_1.default);
        res.status(200).send({
            success: true,
            orders,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
