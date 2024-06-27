import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import OrderModel from "../models/orderModel";

// Create New Order

export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    res.status(201).json({
      success: true,
      order,
    });
  }
);

// Get All Orders

export const getAllOrderService = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });

  res.status(200).send({
    success: true,
    orders,
  });
};
