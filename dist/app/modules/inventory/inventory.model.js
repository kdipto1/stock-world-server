"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryItem = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const inventorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        trim: true,
    },
    supplier: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
}, {
    timestamps: true,
});
// Add indexes for better query performance
inventorySchema.index({ email: 1 });
inventorySchema.index({ category: 1 });
inventorySchema.index({ createdAt: -1 });
inventorySchema.index({ name: 1 });
inventorySchema.index({ price: 1 });
inventorySchema.index({ quantity: 1 });
exports.InventoryItem = mongoose_1.default.model("InventoryItem", inventorySchema);
