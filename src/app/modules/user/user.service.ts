import { IUser, IUserResponse } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: IUser): Promise<IUserResponse> => {
  const user = await User.create(payload);
  const userObject = user.toObject();
  
  return {
    _id: userObject._id.toString(),
    name: userObject.name,
    email: userObject.email,
    role: userObject.role,
    createdAt: userObject.createdAt,
    updatedAt: userObject.updatedAt,
  };
};

const getAllUsers = async () => {
  // Password is already excluded by default (select: 0 in model)
  const users = await User.find({}).lean();
  return users;
};

const getUserById = async (id: string) => {
  // Password is already excluded by default (select: 0 in model)
  const user = await User.findById(id).lean();
  return user;
};

const getUserByEmail = async (email: string) => {
  // Password is already excluded by default (select: 0 in model)
  const user = await User.findOne({ email }).lean();
  return user;
};

const updateUser = async (id: string, payload: Partial<IUser>) => {
  const user = await User.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true }
  ).lean();
  return user;
};

const deleteUser = async (id: string) => {
  const user = await User.findByIdAndDelete(id).lean();
  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
