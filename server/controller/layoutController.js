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
exports.getLayoutByType = exports.editLayout = exports.CreateLayout = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const layoutModel_1 = __importDefault(require("../models/layoutModel"));
// Create Layout
exports.CreateLayout = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.body;
        const isTypeExist = yield layoutModel_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default(`${type} already exist!`, 400));
        }
        if (type === "Banner") {
            const { image, title, subTitle } = req.body;
            const myCloud = yield cloudinary_1.default.v2.uploader.upload(image, {
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
            yield layoutModel_1.default.create(banner);
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const FaqItems = yield Promise.all(faq.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            })));
            yield layoutModel_1.default.create({ type: "FAQ", faq: FaqItems });
        }
        if (type === "Category") {
            const { categories } = req.body;
            const CategoriesItems = yield Promise.all(categories.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return {
                    title: item.title,
                };
            })));
            yield layoutModel_1.default.create({
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
}));
// Edit Layout
exports.editLayout = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.body;
        if (type === "Banner") {
            const bannerData = yield layoutModel_1.default.findOne({ type: "Banner" });
            const { image, title, subTitle } = req.body;
            const data = image.startsWith("https")
                ? bannerData
                : yield cloudinary_1.default.v2.uploader.upload(image, {
                    folder: "layout",
                });
            const banner = {
                type: "Banner",
                image: {
                    public_id: image.startsWith("https")
                        ? bannerData.banner.image.public_id
                        : data === null || data === void 0 ? void 0 : data.public_id,
                    url: image.startsWith("https")
                        ? bannerData.banner.image.url
                        : data === null || data === void 0 ? void 0 : data.secure_url,
                },
                title,
                subTitle,
            };
            yield layoutModel_1.default.findByIdAndUpdate(bannerData._id, { banner }, { new: true });
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const FaqItem = yield layoutModel_1.default.findOne({ type: "FAQ" });
            const FaqItems = yield Promise.all(faq.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return {
                    question: item.question,
                    answer: item.answer,
                };
            })));
            yield layoutModel_1.default.findByIdAndUpdate(FaqItem === null || FaqItem === void 0 ? void 0 : FaqItem._id, { type: "FAQ", faq: FaqItems }, { new: true });
        }
        if (type === "Category") {
            const { categories } = req.body;
            const Category = yield layoutModel_1.default.findOne({ type: "Category" });
            const CategoriesItems = yield Promise.all(categories.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                return {
                    title: item.title,
                };
            })));
            yield layoutModel_1.default.findByIdAndUpdate(Category === null || Category === void 0 ? void 0 : Category._id, {
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
}));
// Get Layout by Type
exports.getLayoutByType = (0, catchAsyncErrors_1.CatchAsyncError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.params;
        const layout = yield layoutModel_1.default.findOne({ type });
        res.status(201).send({
            success: true,
            layout,
        });
    }
    catch (error) {
        console.log(error);
        return next(new ErrorHandler_1.default(error.message, 500));
    }
}));
