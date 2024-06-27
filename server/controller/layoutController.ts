import cloudnary from "cloudinary";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import layoutModel from "../models/layoutModel";

// Create Layout

export const CreateLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      const isTypeExist = await layoutModel.findOne({ type });

      if (isTypeExist) {
        return next(new ErrorHandler(`${type} already exist!`, 400));
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;

        const myCloud = await cloudnary.v2.uploader.upload(image, {
          folder: "layout",
        });

        const banner = {
          type: "Banner",
          banner: {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
        };

        await layoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;

        const FaqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.create({ type: "FAQ", faq: FaqItems });
      }

      if (type === "Category") {
        const { categories } = req.body;

        const CategoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );

        await layoutModel.create({
          type: "Category",
          categories: CategoriesItems,
        });
      }

      res.status(200).send({
        success: true,
        message: "Layout created successfully!",
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit Layout

export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const bannerData: any = await layoutModel.findOne({ type: "Banner" });
        const { image, title, subTitle } = req.body;

        const data = image.startsWith("https")
          ? bannerData
          : await cloudnary.v2.uploader.upload(image, {
              folder: "layout",
            });

        const banner = {
          type: "Banner",
          image: {
            public_id: image.startsWith("https")
              ? bannerData.banner.image.public_id
              : data?.public_id,
            url: image.startsWith("https")
              ? bannerData.banner.image.url
              : data?.secure_url,
          },
          title,
          subTitle,
        };

        await layoutModel.findByIdAndUpdate(
          bannerData._id,
          { banner },
          { new: true }
        );
      }

      if (type === "FAQ") {
        const { faq } = req.body;

        const FaqItem = await layoutModel.findOne({ type: "FAQ" });

        const FaqItems = await Promise.all(
          faq.map(async (item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.findByIdAndUpdate(
          FaqItem?._id,
          { type: "FAQ", faq: FaqItems },
          { new: true }
        );
      }

      if (type === "Category") {
        const { categories } = req.body;

        const Category = await layoutModel.findOne({ type: "Category" });

        const CategoriesItems = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );

        await layoutModel.findByIdAndUpdate(
          Category?._id,
          {
            type: "Category",
            categories: CategoriesItems,
          },
          { new: true }
        );
      }

      res.status(200).send({
        success: true,
        message: "Layout updated successfully!",
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get Layout by Type

export const getLayoutByType = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;
      const layout = await layoutModel.findOne({ type });

      res.status(201).send({
        success: true,
        layout,
      });
    } catch (error: any) {
      console.log(error);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
