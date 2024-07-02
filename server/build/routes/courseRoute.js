"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controller/courseController");
const auth_1 = require("../middleware/auth");
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
// Create Course
router.post("/upload-Course", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), courseController_1.uploadCourse);
// Update Course
router.put("/update-course/:id", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), courseController_1.editCourceController);
// Get Single Course
router.get("/get-single-course/:id", courseController_1.getSingleCourse);
// Get ALl Course
router.get("/get-courses", courseController_1.getAllCourses);
// Get User course
router.get("/user-course-content/:id", userController_1.updateAccessToken, auth_1.isAuthenticated, courseController_1.getCourseByUser);
// Add user Question
router.put("/add-question", userController_1.updateAccessToken, auth_1.isAuthenticated, courseController_1.addQuestions);
// Add Answer in course question
router.put("/add-answer", userController_1.updateAccessToken, auth_1.isAuthenticated, courseController_1.addAnswer);
// Add review
router.put("/add-review/:id", userController_1.updateAccessToken, auth_1.isAuthenticated, courseController_1.addReviewInCourse);
// Add Review Reply
router.put("/add-reply-review", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), courseController_1.addReplyToReview);
// Get ALl Courses -----------Only for Admin
router.get("/get-all-courses", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), courseController_1.getAllCoursesAdmin);
// VdoCipher
router.post("/getVdoCipherOTP", courseController_1.generateVideoUrl);
// Course Delete
router.delete("/delete-course/:id", userController_1.updateAccessToken, auth_1.isAuthenticated, (0, userController_1.authorizedRole)("admin"), courseController_1.deleteCourse);
exports.default = router;
