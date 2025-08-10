"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Normalize a single origin by trimming and removing trailing slashes and wildcard suffixes
const normalizeOrigin = (origin) => {
    if (!origin)
        return origin;
    let trimmed = origin.trim();
    if (trimmed.endsWith("/*")) {
        trimmed = trimmed.slice(0, -2);
    }
    while (trimmed.length > 0 && trimmed.endsWith("/")) {
        trimmed = trimmed.slice(0, -1);
    }
    return trimmed;
};
// Parse allowed origins from env. Supports comma-separated list in CORS_ORIGINS.
const parseAllowedOriginsFromEnv = () => {
    const envList = process.env.CORS_ORIGINS || process.env.PORTFOLIO_DOMAIN || "";
    if (!envList)
        return [];
    return envList
        .split(",")
        .map((item) => normalizeOrigin(item))
        .filter((item) => Boolean(item));
};
const defaultAllowedOrigins = [
    process.env.PORTFOLIO_DOMAIN || "http://localhost:10000",
    "https://stock-world-1.web.app",
];
const allowedOrigins = (() => {
    const fromEnv = parseAllowedOriginsFromEnv();
    const list = fromEnv.length > 0 ? fromEnv : defaultAllowedOrigins;
    // Ensure uniqueness and normalized values
    const unique = Array.from(new Set(list.map((o) => normalizeOrigin(o))));
    return unique;
})();
const config = {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: process.env.NODE_ENV || "development",
    mongoose: {
        url: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017",
        dbName: process.env.MONGODB_DB_NAME || "stockWorld",
    },
    jwt: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: "7d",
    },
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    },
    pingUrl: process.env.PING_URL || "http://localhost:5000",
    corsOrigin: allowedOrigins,
};
exports.default = config;
