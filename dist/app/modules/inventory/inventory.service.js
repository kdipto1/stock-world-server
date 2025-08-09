"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const inventory_model_1 = require("./inventory.model");
const inventory_log_model_1 = require("./inventory-log.model");
const createItem = async (user, payload) => {
    const item = await inventory_model_1.InventoryItem.create({
        ...payload,
        email: user.email,
    });
    await inventory_log_model_1.InventoryLog.create({
        itemId: item._id,
        userEmail: user.email,
        action: "CREATE",
        changes: item.toObject(),
    });
    return item;
};
const getHomeItems = async (limit = 6) => {
    const items = await inventory_model_1.InventoryItem.find({})
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean();
    return items;
};
const getAllItems = async (query) => {
    const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", category, } = query;
    // Ensure page and limit are integers
    const pageInt = parseInt(page, 10) || 1;
    const limitInt = parseInt(limit, 10) || 10;
    const findQuery = category ? { category } : {};
    const items = await inventory_model_1.InventoryItem.find(findQuery)
        .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
        .skip((pageInt - 1) * limitInt)
        .limit(limitInt)
        .lean();
    const total = await inventory_model_1.InventoryItem.countDocuments(findQuery);
    return {
        data: items,
        meta: {
            page: pageInt,
            limit: limitInt,
            total,
            totalPages: Math.ceil(total / limitInt),
        },
    };
};
const getItemById = async (id) => {
    const item = await inventory_model_1.InventoryItem.findById(id);
    return item;
};
const updateItem = async (id, payload, user) => {
    const oldItem = await inventory_model_1.InventoryItem.findById(id);
    const item = await inventory_model_1.InventoryItem.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
    if (item) {
        await inventory_log_model_1.InventoryLog.create({
            itemId: item._id,
            userEmail: user.email,
            action: "UPDATE",
            changes: {
                before: oldItem?.toObject(),
                after: item.toObject(),
            },
        });
    }
    return item;
};
const deleteItem = async (id, user) => {
    const item = await inventory_model_1.InventoryItem.findById(id);
    const result = await inventory_model_1.InventoryItem.findByIdAndDelete(id);
    if (item) {
        await inventory_log_model_1.InventoryLog.create({
            itemId: item._id,
            userEmail: user.email,
            action: "DELETE",
            changes: item.toObject(),
        });
    }
    return result;
};
const getUserItems = async (email) => {
    const items = await inventory_model_1.InventoryItem.find({ email })
        .sort({ createdAt: -1 })
        .lean();
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
