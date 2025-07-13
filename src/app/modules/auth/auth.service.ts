import { Secret } from "jsonwebtoken";
import config from "../../../config/config";
import { JwtHelpers } from "../../../utils/jwtHelpers";

interface LoginPayload {
  email: string;
}

interface LoginResponse {
  token: string;
}

const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { email } = payload;

  const token = JwtHelpers.createToken(
    { email, role: "user" },
    config.jwt.secret as Secret,
    config.jwt.expiresIn,
  );

  return { token };
};

export const AuthService = {
  login,
};
