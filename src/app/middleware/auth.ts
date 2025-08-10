import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { JwtPayload, Secret } from "jsonwebtoken";
import { JwtHelpers } from "../../utils/jwtHelpers";
import config from "../../config/config";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers["authorization"]?.replace("Bearer ", "");
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }

      let verifiedUser: JwtPayload | string = "";

      verifiedUser = JwtHelpers.verifyToken(token, config.jwt.secret as Secret);

      if (typeof verifiedUser === "string") {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          "Token verification failed",
        );
      }

      (req as any).user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
