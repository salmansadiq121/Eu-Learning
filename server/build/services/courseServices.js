"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCoursesService = exports.createCourse = void 0;
const courseModel_1 = __importDefault(require("../models/courseModel"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
// Create Course
exports.createCourse = (0, catchAsyncErrors_1.CatchAsyncError)(async (data, res) => {
    const course = await courseModel_1.default.create(data);
    res.status(200).send({
        success: true,
        course,
    });
});
// Get All Courses
const getAllCoursesService = async (res) => {
    const courses = await courseModel_1.default.find().sort({ createdAt: -1 });
    res.status(200).send({
        success: true,
        courses,
    });
};
exports.getAllCoursesService = getAllCoursesService;
