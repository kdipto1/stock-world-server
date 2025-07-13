import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  
  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

export const AuthController = {
  login,
};
