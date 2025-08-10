import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { DashboardService } from "./dashboard.service";
import httpStatus from "http-status";

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await DashboardService.getDashboardStats();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Dashboard stats retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.error("❌ Dashboard stats error:", error);
    throw error;
  }
});

export const DashboardController = {
  getDashboardStats,
};
