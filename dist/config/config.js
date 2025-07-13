"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    mongoose: {
        url: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/stockworld",
    },
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: "7d",
    },
    pingUrl: process.env.PING_URL || "http://localhost:5000",
};
exports.default = config;
