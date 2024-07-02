"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./utils/db"));
const socketServer_1 = require("./socketServer");
const server = http_1.default.createServer(index_1.app);
// Dotenv Configure
dotenv_1.default.config();
// Cloudnary
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});
// Socket Server
(0, socketServer_1.initSocketServer)(server);
// Listen
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
    (0, db_1.default)();
});
