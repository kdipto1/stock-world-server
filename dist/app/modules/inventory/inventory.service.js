"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const inventory_model_1 = require("./inventory.model");
const createItem = async (user, payload) => {
    const item = await inventory_model_1.InventoryItem.create({
        ...payload,
        email: user.email,
    });
    return item;
};
const getHomeItems = async (limit = 6) => {
    const items = await inventory_model_1.InventoryItem.find({}).limit(limit).sort({ createdAt: -1 });
    return items;
};
const getAllItems = async () => {
    const items = await inventory_model_1.InventoryItem.find({}).sort({ createdAt: -1 });
    return items;
};
const getItemById = async (id) => {
    const item = await inventory_model_1.InventoryItem.findById(id);
    return item;
};
const updateItem = async (id, payload) => {
    const item = await inventory_model_1.InventoryItem.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
    return item;
};
const deleteItem = async (id) => {
    const result = await inventory_model_1.InventoryItem.findByIdAndDelete(id);
    return result;
};
const getUserItems = async (email) => {
    const items = await inventory_model_1.InventoryItem.find({ email }).sort({ createdAt: -1 });
    return items;
};
exports.InventoryService = {
    createItem,
    getHomeItems,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    getUserItems,
};
