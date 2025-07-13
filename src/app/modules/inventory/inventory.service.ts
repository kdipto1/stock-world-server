import { UserPayload } from "../../../interfaces/user.payload";
import { IInventoryCreatePayload, IInventoryUpdatePayload } from "./inventory.interfaces";
import { InventoryItem } from "./inventory.model";
import { Types } from "mongoose";

const createItem = async (
  user: UserPayload,
  payload: IInventoryCreatePayload,
) => {
  const item = await InventoryItem.create({
    ...payload,
    email: user.email,
  });
  return item;
};

const getHomeItems = async (limit: number = 6) => {
  const items = await InventoryItem.find({}).limit(limit).sort({ createdAt: -1 });
  return items;
};

const getAllItems = async () => {
  const items = await InventoryItem.find({}).sort({ createdAt: -1 });
  return items;
};

const getItemById = async (id: string) => {
  const item = await InventoryItem.findById(id);
  return item;
};

const updateItem = async (id: string, payload: IInventoryUpdatePayload) => {
  const item = await InventoryItem.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true },
  );
  return item;
};

const deleteItem = async (id: string) => {
  const result = await InventoryItem.findByIdAndDelete(id);
  return result;
};

const getUserItems = async (email: string) => {
  const items = await InventoryItem.find({ email }).sort({ createdAt: -1 });
  return items;
};

export const InventoryService = {
  createItem,
  getHomeItems,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getUserItems,
};
