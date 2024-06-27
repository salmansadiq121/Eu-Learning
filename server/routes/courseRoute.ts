import express from "express";
import {
  addAnswer,
  addQuestions,
  addReplyToReview,
  addReviewInCourse,
  deleteCourse,
  editCourceController,
  generateVideoUrl,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controller/courseController";
import { isAuthenticated } from "../middleware/auth";
import {
  authorizedRole,
  updateAccessToken,
} from "../controller/userController";

const router = express.Router();

// Create Course
router.post(
  "/upload-Course",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  uploadCourse
);

// Update Course
router.put(
  "/update-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  editCourceController
);

// Get Single Course
router.get("/get-single-course/:id", getSingleCourse);

// Get ALl Course
router.get("/get-courses", getAllCourses);

// Get User course
router.get(
  "/user-course-content/:id",
  updateAccessToken,
  isAuthenticated,
  getCourseByUser
);

// Add user Question
router.put("/add-question", updateAccessToken, isAuthenticated, addQuestions);

// Add Answer in course question
router.put("/add-answer", updateAccessToken, isAuthenticated, addAnswer);

// Add review
router.put(
  "/add-review/:id",
  updateAccessToken,
  isAuthenticated,
  addReviewInCourse
);
// Add Review Reply
router.put(
  "/add-reply-review",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  addReplyToReview
);

// Get ALl Courses -----------Only for Admin
router.get(
  "/get-all-courses",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  getAllCoursesAdmin
);

// VdoCipher
router.post("/getVdoCipherOTP", generateVideoUrl);

// Course Delete
router.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizedRole("admin"),
  deleteCourse
);

export default router;
