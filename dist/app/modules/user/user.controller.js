"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const createUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserService.createUser(req.body);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: "User created successfully",
        data: result,
    });
});
exports.UserController = {
    createUser,
};
