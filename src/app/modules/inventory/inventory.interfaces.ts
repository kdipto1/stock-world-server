import { Document, Model } from "mongoose";

export interface IInventoryItem extends Document {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  supplier?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type InventoryModel = Model<IInventoryItem>;

export interface IInventoryCreatePayload {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  category?: string;
  supplier?: string;
  email?: string;
}

export interface IInventoryUpdatePayload {
  quantity: number;
}
