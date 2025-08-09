
import { Schema, model } from "mongoose";

const inventoryLogSchema = new Schema(
  {
    itemId: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true,
  },
);

export const InventoryLog = model("InventoryLog", inventoryLogSchema);
