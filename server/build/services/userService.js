"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleService = exports.getAllUsersService = exports.getUserById = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const redis_1 = require("../utils/redis");
// Get User by Id
const getUserById = async (id, res) => {
    const userJson = await redis_1.redis.get(id);
    if (userJson) {
        const user = JSON.parse(userJson);
        res.status(200).send({
            success: true,
            user,
        });
    }
};
exports.getUserById = getUserById;
// Get All Users
const getAllUsersService = async (res) => {
    const users = await userModel_1.default.find().sort({ createdAt: -1 });
    res.status(200).send({
        success: true,
        users,
    });
};
exports.getAllUsersService = getAllUsersService;
// update User Role Service
const updateUserRoleService = async (res, id, role) => {
    const user = await userModel_1.default.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).send({
        success: true,
        user,
    });
};
exports.updateUserRoleService = updateUserRoleService;
