"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const inventory_model_1 = require("../inventory/inventory.model");
const getDashboardStats = async () => {
    const stats = await inventory_model_1.InventoryItem.aggregate([
        {
            $group: {
                _id: null,
                totalItems: { $sum: 1 },
                totalQuantity: { $sum: "$quantity" },
                totalValue: { $sum: { $multiply: ["$price", "$quantity"] } },
            },
        },
        {
            $lookup: {
                from: "inventoryitems",
                pipeline: [
                    {
                        $match: {
                            quantity: { $lt: 10 },
                        },
                    },
                    {
                        $count: "lowStockItems",
                    },
                ],
                as: "lowStockInfo",
            },
        },
        {
            $unwind: {
                path: "$lowStockInfo",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "inventoryitems",
                pipeline: [
                    {
                        $group: {
                            _id: "$category",
                            count: { $sum: 1 },
                        },
                    },
                ],
                as: "categoryCounts",
            },
        },
        {
            $project: {
                _id: 0,
                totalItems: 1,
                totalQuantity: 1,
                totalValue: 1,
                lowStockItems: { $ifNull: ["$lowStockInfo.lowStockItems", 0] },
                categoryCounts: "$categoryCounts",
            },
        },
    ]);
    return stats[0];
};
exports.DashboardService = {
    getDashboardStats,
};
