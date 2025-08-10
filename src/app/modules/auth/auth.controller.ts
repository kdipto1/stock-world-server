import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import { ILoginPayload } from "./auth.interface";

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body as ILoginPayload);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const socialLogin = catchAsync(async (req: Request, res: Response) => {
  const { idToken } = req.body;
  const result = await AuthService.socialLogin(idToken);
  res.status(httpStatus.OK).json({ success: true, message: 'Social login successful', data: result });
});

export const AuthController = {
  login,
  socialLogin,
};
