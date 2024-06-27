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
exports.generateVideoUrl = exports.deleteCourse = exports.getAllCoursesAdmin = exports.addReplyToReview = exports.addReviewInCourse = exports.addAnswer = exports.addQuestions = exports.getCourseByUser = exports.getAllCourses = exports.getSingleCourse = exports.editCourceController = exports.uploadCourse = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const courseServices_1 = require("../services/courseServices");
const courseModel_1 = __importDefault(require("../models/courseModel"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Upload Course
exports.uploadCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        (0, courseServices_1.createCourse)(data, res, next);
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Edit Cource Controller
exports.editCourceController = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        const courseId = req.params.id;
        const courseData = (yield courseModel_1.default.findById(courseId));
        if (thumbnail && !thumbnail.url.startsWith("https")) {
            yield cloudinary_1.default.v2.uploader.destroy(courseData.thumbnail.public_id);
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses",
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };
        }
        if (thumbnail.url.startsWith("https")) {
            data.thumbnail = {
                public_id: courseData === null || courseData === void 0 ? void 0 : courseData.thumbnail.public_id,
                url: courseData === null || courseData === void 0 ? void 0 : courseData.thumbnail.url,
            };
        }
        const course = yield courseModel_1.default.findByIdAndUpdate(courseId, {
            $set: data,
        }, { new: true });
        res.status(200).send({
            success: true,
            message: "Course updated",
            course,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Get Single Course
exports.getSingleCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courseId = req.params.id;
        const isCacheExist = yield redis_1.redis.get(courseId);
        if (isCacheExist) {
            const course = JSON.parse(isCacheExist);
            res.status(200).send({
                success: true,
                message: "Single Course",
                course,
            });
        }
        else {
            const course = yield courseModel_1.default.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            yield redis_1.redis.set(courseId, JSON.stringify(course), "EX", 604800); //7 days
            res.status(200).send({
                success: true,
                message: "Single Course",
                course,
            });
        }
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Get All Courses
exports.getAllCourses = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isCacheExist = yield redis_1.redis.get("all courses");
        if (isCacheExist) {
            const courses = JSON.parse(isCacheExist);
            res.status(200).send({
                success: true,
                courses,
            });
            console.log("redis");
        }
        else {
            const courses = yield courseModel_1.default.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            yield redis_1.redis.set("all courses", JSON.stringify(courses));
            console.log("mongo");
            res.status(200).send({
                totol: courses.length,
                success: true,
                courses,
            });
        }
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Get Course content only for vaild User
exports.getCourseByUser = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userCourseLint = (_a = req.user) === null || _a === void 0 ? void 0 : _a.courses;
        const courseId = req.params.id;
        const courseExists = userCourseLint === null || userCourseLint === void 0 ? void 0 : userCourseLint.find((course) => course._id.toString() === courseId);
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You are not eligible to access this course!", 404));
        }
        const course = yield courseModel_1.default.findById(courseId);
        const content = course === null || course === void 0 ? void 0 : course.courseData;
        res.status(200).send({
            success: true,
            content,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.messaage, 400));
    }
}));
exports.addQuestions = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { question, courseId, contentId } = req.body;
        const course = yield courseModel_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content ID", 400));
        }
        const courseContent = (_b = course === null || course === void 0 ? void 0 : course.courseData) === null || _b === void 0 ? void 0 : _b.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Invalid content ID", 400));
        }
        // Create new question object
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: [],
        };
        // Add this question to our course content
        courseContent.questions.push(newQuestion);
        // Create a Notification
        yield notificationModel_1.default.create({
            user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
            title: "New Question Received",
            message: `You have a new question in ${courseContent === null || courseContent === void 0 ? void 0 : courseContent.title}`,
        });
        // Save the updated course
        yield (course === null || course === void 0 ? void 0 : course.save());
        res.status(200).send({
            success: true,
            course,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.addAnswer = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    try {
        const { answer, courseId, contentId, questionId } = req.body;
        const course = yield courseModel_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content ID", 400));
        }
        const courseContent = (_d = course === null || course === void 0 ? void 0 : course.courseData) === null || _d === void 0 ? void 0 : _d.find((item) => item._id.equals(contentId));
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const question = (_e = courseContent === null || courseContent === void 0 ? void 0 : courseContent.questions) === null || _e === void 0 ? void 0 : _e.find((item) => item._id.equals(questionId));
        if (!question) {
            return next(new ErrorHandler_1.default("Invalid question id", 400));
        }
        // create new answer object
        const newAnswer = {
            user: req.user,
            answer,
        };
        // Add this answer to our course content
        question.questionReplies.push(newAnswer);
        // Save update course
        yield (course === null || course === void 0 ? void 0 : course.save());
        if (((_f = req.user) === null || _f === void 0 ? void 0 : _f._id) === question.user._id) {
            // Create a Notification
            yield notificationModel_1.default.create({
                user: (_g = req.user) === null || _g === void 0 ? void 0 : _g._id,
                title: "New Question Reply Received",
                message: `You have a new question reply in ${courseContent === null || courseContent === void 0 ? void 0 : courseContent.title}`,
            });
        }
        else {
            const data = {
                name: question.user.name,
                title: courseContent.title,
            };
            const html = yield ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/question-reply.ejs"), data);
            try {
                yield (0, sendMail_1.default)({
                    email: question.user.email,
                    subject: "Question reply",
                    template: "question-reply.ejs",
                    data,
                });
            }
            catch (error) {
                console.log(error);
                return next(new ErrorHandler_1.default(error.message, 400));
            }
        }
        res.status(200).send({
            success: true,
            course,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.addReviewInCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k;
    try {
        const userCourseLint = (_h = req.user) === null || _h === void 0 ? void 0 : _h.courses;
        const courseId = req.params.id;
        // Check if the course ID Exist in user courselist based on _id
        const courseExist = userCourseLint === null || userCourseLint === void 0 ? void 0 : userCourseLint.some((course) => course._id.toString() === courseId.toString());
        if (!courseExist) {
            return next(new ErrorHandler_1.default("You are not eligible to access this course!", 400));
        }
        const course = yield courseModel_1.default.findById(courseId);
        const { review, rating } = req.body;
        const reviewData = {
            user: req.user,
            comment: review,
            rating,
        };
        (_j = course === null || course === void 0 ? void 0 : course.reviews) === null || _j === void 0 ? void 0 : _j.push(reviewData);
        let avg = 0;
        course === null || course === void 0 ? void 0 : course.reviews.forEach((rev) => {
            avg += rev.rating;
        });
        if (course) {
            course.ratings = avg / course.reviews.length;
        }
        yield (course === null || course === void 0 ? void 0 : course.save());
        const notification = {
            title: "New Review Received",
            message: `${(_k = req.user) === null || _k === void 0 ? void 0 : _k.name} has given a review in ${course === null || course === void 0 ? void 0 : course.name}`,
        };
        // Create notification
        res.status(200).send({
            success: true,
            course,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
exports.addReplyToReview = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m;
    try {
        const { comment, courseId, reviewId } = req.body;
        const course = yield courseModel_1.default.findById(courseId);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found", 404));
        }
        const review = (_l = course === null || course === void 0 ? void 0 : course.reviews) === null || _l === void 0 ? void 0 : _l.find((rev) => rev._id.toString() === reviewId);
        if (!review) {
            return next(new ErrorHandler_1.default("Review not found", 404));
        }
        const replyData = {
            user: req.user,
            comment,
        };
        if (!review.commentReplies) {
            review.commentReplies = [];
        }
        (_m = review.commentReplies) === null || _m === void 0 ? void 0 : _m.push(replyData);
        yield (course === null || course === void 0 ? void 0 : course.save());
        res.status(200).send({
            success: true,
            course,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Get ALl Courses for Admin
exports.getAllCoursesAdmin = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, courseServices_1.getAllCoursesService)(res);
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Delete Course
exports.deleteCourse = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield courseModel_1.default.findById(id);
        if (!course) {
            return next(new ErrorHandler_1.default("Course not found!", 404));
        }
        yield course.deleteOne({ id });
        yield redis_1.redis.del(id);
        res.status(200).send({
            success: true,
            message: "Course deleted successfully",
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
// Generate Video URL
exports.generateVideoUrl = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.body;
        console.log("Video_id:", videoId);
        const response = yield axios_1.default.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 400));
    }
}));
