import { Model, Document } from "mongoose";

export interface IUser extends Document {
  _id: any;
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserResponse {
  name: string;
  email: string;
  role: "user" | "admin";
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserModel = Model<IUser>;
