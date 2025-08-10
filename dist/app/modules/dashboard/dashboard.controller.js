"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const dashboard_service_1 = require("./dashboard.service");
const http_status_1 = __importDefault(require("http-status"));
const getDashboardStats = (0, catchAsync_1.default)(async (req, res) => {
    try {
        const result = await dashboard_service_1.DashboardService.getDashboardStats();
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Dashboard stats retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.error("❌ Dashboard stats error:", error);
        throw error;
    }
});
exports.DashboardController = {
    getDashboardStats,
};
