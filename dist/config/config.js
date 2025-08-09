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
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    },
    pingUrl: process.env.PING_URL || "http://localhost:5000",
    corsOrigin: process.env.PORTFOLIO_DOMAIN || "*",
};
exports.default = config;
