"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayoutByType = exports.editLayout = exports.CreateLayout = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const layoutModel_1 = __importDefault(require("../models/layoutModel"));
// Create Layout
exports.CreateLayout = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        const isTypeExist = await layoutModel_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default(`${type} already exist!`, 400));
        }
        if (type === "Banner") {
            const { image, title, subTitle } = req.body;
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
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
            await layoutModel_1.default.create(banner);
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const FaqItems = await Promise.all(faq.map(async (item) => {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            }));
            await layoutModel_1.default.create({ type: "FAQ", faq: FaqItems });
        }
        if (type === "Category") {
            const { categories } = req.body;
            const CategoriesItems = await Promise.all(categories.map(async (item) => {
                return {
                    title: item.title,
                };
            }));
            await layoutModel_1.default.create({
                type: "Category",
                categories: CategoriesItems,
            });
        }
        res.status(200).send({
            success: true,
            message: "Layout created successfully!",
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Edit Layout
exports.editLayout = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        if (type === "Banner") {
            const bannerData = await layoutModel_1.default.findOne({ type: "Banner" });
            const { image, title, subTitle } = req.body;
            const data = image.startsWith("https")
                ? bannerData
                : await cloudinary_1.default.v2.uploader.upload(image, {
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
            await layoutModel_1.default.findByIdAndUpdate(bannerData._id, { banner }, { new: true });
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const FaqItem = await layoutModel_1.default.findOne({ type: "FAQ" });
            const FaqItems = await Promise.all(faq.map(async (item) => {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            }));
            await layoutModel_1.default.findByIdAndUpdate(FaqItem?._id, { type: "FAQ", faq: FaqItems }, { new: true });
        }
        if (type === "Category") {
            const { categories } = req.body;
            const Category = await layoutModel_1.default.findOne({ type: "Category" });
            const CategoriesItems = await Promise.all(categories.map(async (item) => {
                return {
                    title: item.title,
                };
            }));
            await layoutModel_1.default.findByIdAndUpdate(Category?._id, {
                type: "Category",
                categories: CategoriesItems,
            }, { new: true });
        }
        res.status(200).send({
            success: true,
            message: "Layout updated successfully!",
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// Get Layout by Type
exports.getLayoutByType = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.params;
        const layout = await layoutModel_1.default.findOne({ type });
        res.status(201).send({
            success: true,
            layout,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
