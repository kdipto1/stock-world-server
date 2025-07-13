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
  },
);

export const InventoryItem = mongoose.model<IInventoryItem, InventoryModel>(
  "InventoryItem",
  inventorySchema,
);
