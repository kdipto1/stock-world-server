"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const config_1 = __importDefault(require("../../../config/config"));
const jwtHelpers_1 = require("../../../utils/jwtHelpers");
const login = async (payload) => {
    const { email } = payload;
    const token = jwtHelpers_1.JwtHelpers.createToken({ email, role: "user" }, config_1.default.jwt.secret, config_1.default.jwt.expiresIn);
    return { token };
};
exports.AuthService = {
    login,
};
