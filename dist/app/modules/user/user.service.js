"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const createUser = async (payload) => {
    const user = await user_model_1.User.create(payload);
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
    const users = await user_model_1.User.find({}).lean();
    return users;
};
const getUserById = async (id) => {
    // Password is already excluded by default (select: 0 in model)
    const user = await user_model_1.User.findById(id).lean();
    return user;
};
const getUserByEmail = async (email) => {
    // Password is already excluded by default (select: 0 in model)
    const user = await user_model_1.User.findOne({ email }).lean();
    return user;
};
const updateUser = async (id, payload) => {
    const user = await user_model_1.User.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
    return user;
};
const deleteUser = async (id) => {
    const user = await user_model_1.User.findByIdAndDelete(id).lean();
    return user;
};
exports.UserService = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser,
};
