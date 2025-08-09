
import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { DashboardService } from "./dashboard.service";
import httpStatus from "http-status";

const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getDashboardStats();
  
  res.status(httpStatus.OK).json({
    success: true,
    message: "Dashboard stats retrieved successfully",
    data: result,
  });
});

export const DashboardController = {
  getDashboardStats,
};
