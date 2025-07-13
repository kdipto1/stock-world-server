"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const inventory_service_1 = require("./inventory.service");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createItem = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await inventory_service_1.InventoryService.createItem(user, req.body);
    res.status(http_status_1.default.CREATED).json({
        success: true,
        message: "Item created successfully",
        data: result,
    });
});
const getHomeItems = (0, catchAsync_1.default)(async (req, res) => {
    const result = await inventory_service_1.InventoryService.getHomeItems();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Home items retrieved successfully",
        data: result,
    });
});
const getAllItems = (0, catchAsync_1.default)(async (req, res) => {
    const result = await inventory_service_1.InventoryService.getAllItems();
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "All items retrieved successfully",
        data: result,
    });
});
const getItemById = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await inventory_service_1.InventoryService.getItemById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Item not found");
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Item retrieved successfully",
        data: result,
    });
});
const updateItem = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await inventory_service_1.InventoryService.updateItem(id, req.body);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Item not found");
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Item updated successfully",
        data: result,
    });
});
const deleteItem = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const result = await inventory_service_1.InventoryService.deleteItem(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Item not found");
    }
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "Item deleted successfully",
        data: result,
    });
});
const getUserItems = (0, catchAsync_1.default)(async (req, res) => {
    const { email } = req.query;
    const result = await inventory_service_1.InventoryService.getUserItems(email);
    res.status(http_status_1.default.OK).json({
        success: true,
        message: "User items retrieved successfully",
        data: result,
    });
});
exports.InventoryController = {
    createItem,
    getHomeItems,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem,
    getUserItems,
};
