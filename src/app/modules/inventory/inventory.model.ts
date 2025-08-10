import mongoose from "mongoose";
import { IInventoryItem, InventoryModel } from "./inventory.interfaces";

const inventorySchema = new mongoose.Schema<IInventoryItem, InventoryModel>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
inventorySchema.index({ email: 1 });
inventorySchema.index({ category: 1 });
inventorySchema.index({ createdAt: -1 });
inventorySchema.index({ name: 1 });
inventorySchema.index({ price: 1 });
inventorySchema.index({ quantity: 1 });

export const InventoryItem = mongoose.model<IInventoryItem, InventoryModel>(
  "InventoryItem",
  inventorySchema
);
