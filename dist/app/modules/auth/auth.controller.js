"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await auth_service_1.AuthService.login(req.body);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "User logged in successfully",
        data: result,
    });
});
exports.AuthController = {
    login,
};
