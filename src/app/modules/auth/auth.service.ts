import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config/config";
import ApiError from "../../../errors/ApiError";
import { JwtHelpers } from "../../../utils/jwtHelpers";
import { User } from "../user/user.model";
import { ILoginPayload, ILoginResponse } from "./auth.interface";
import { firebaseAdmin } from '../../../config/firebaseAdmin';

const login = async (payload: ILoginPayload): Promise<ILoginResponse> => {
  const { email, password } = payload;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const isPasswordMatch = await user.isPasswordMatch(password);

  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }

  const tokenPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const token = JwtHelpers.createToken(
    tokenPayload,
    config.jwt.secret as Secret,
    config.jwt.expiresIn
  );

  return {
    token,
  };
};

const socialLogin = async (idToken: string) => {
  const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
  const { email, name, uid } = decodedToken;

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, name: name || 'Unnamed User', role: 'user' });
  }

  const payload = { userId: user._id, email: user.email, role: user.role };
  const token = JwtHelpers.createToken(payload, config.jwt.secret, config.jwt.expiresIn);

  return { token };
};

export const AuthService = {
  login,
  socialLogin,
};
