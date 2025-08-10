"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../utils/jwtHelpers");
const config_1 = __importDefault(require("../../config/config"));
const auth = (...requiredRoles) => async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized");
        }
        let verifiedUser = "";
        verifiedUser = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        if (typeof verifiedUser === "string") {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Token verification failed");
        }
        req.user = verifiedUser;
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.default = auth;
