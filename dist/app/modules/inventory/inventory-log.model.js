"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryLog = void 0;
const mongoose_1 = require("mongoose");
const inventoryLogSchema = new mongoose_1.Schema({
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "InventoryItem",
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        enum: ["CREATE", "UPDATE", "DELETE"],
        required: true,
    },
    changes: {
        type: Object,
    },
}, {
    timestamps: true,
});
exports.InventoryLog = (0, mongoose_1.model)("InventoryLog", inventoryLogSchema);
