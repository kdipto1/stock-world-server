import mongoose from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to hash password
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.isPasswordMatch = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser, UserModel>("User", userSchema);
