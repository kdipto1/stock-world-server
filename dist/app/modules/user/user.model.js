"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: false,
        minlength: 6,
        select: 0, // Exclude by default
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
}, {
    timestamps: true,
});
// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
    if (this.isModified("password") && this.password) {
        this.password = await bcryptjs_1.default.hash(this.password, 10);
    }
    next();
});
// Method to compare passwords
userSchema.methods.isPasswordMatch = async function (password) {
    return await bcryptjs_1.default.compare(password, this.password);
};
exports.User = mongoose_1.default.model("User", userSchema);
