import notificationModel from "../models/notificationModel";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cron from "node-cron";

// Get ALL Notification
export const getNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(200).send({
        success: true,
        notification,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update Notification Status

export const updateNotificationStatus = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await notificationModel.findByIdAndUpdate(
        req.params.id
      );

      if (!notification) {
        return next(new ErrorHandler("Notification not found", 400));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }
      await notification.save();

      const notifications = await notificationModel
        .find()
        .sort({ createdAt: -1 });

      res.status(200).send({
        success: true,
        notifications,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Delete Notification

cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  await notificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });

  console.log("Read notification deleted");
});
