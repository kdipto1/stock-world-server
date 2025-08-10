"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config/config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const user_model_1 = require("../user/user.model");
const firebaseAdmin_1 = require("../../../config/firebaseAdmin");
const login = async (payload) => {
    const { email, password } = payload;
    const user = await user_model_1.User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    const isPasswordMatch = await user.isPasswordMatch(password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Invalid credentials");
    }
    const tokenPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const token = jwtHelpers_1.JwtHelpers.createToken(tokenPayload, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    return {
        token,
    };
};
const socialLogin = async (idToken) => {
    const decodedToken = await firebaseAdmin_1.firebaseAdmin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decodedToken;
    let user = await user_model_1.User.findOne({ email });
    if (!user) {
        user = await user_model_1.User.create({ email, name: name || 'Unnamed User', role: 'user' });
    }
    const payload = { userId: user._id, email: user.email, role: user.role };
    const token = jwtHelpers_1.JwtHelpers.createToken(payload, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    return { token };
};
exports.AuthService = {
    login,
    socialLogin,
};
