import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { generateLast12MonthData } from "../utils/analyticsGenerator";
import userModel from "../models/userModel";
import CourseModel from "../models/courseModel";
import OrderModel from "../models/orderModel";

// Get User Analytics
export const getUserAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthData(userModel);

      res.status(200).send({
        success: true,
        users,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get Courses Analytics
export const getCoursesAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthData(CourseModel);

      res.status(200).send({
        success: true,
        courses,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get Orders Analytics
export const getOrdersAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthData(OrderModel);

      res.status(200).send({
        success: true,
        orders,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
