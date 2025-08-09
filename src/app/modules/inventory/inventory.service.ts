import { UserPayload } from "../../../interfaces/user.payload";
import {
  IInventoryCreatePayload,
  IInventoryUpdatePayload,
} from "./inventory.interfaces";
import { InventoryItem } from "./inventory.model";

import { InventoryLog } from "./inventory-log.model";

const createItem = async (
  user: UserPayload,
  payload: IInventoryCreatePayload
) => {
  const item = await InventoryItem.create({
    ...payload,
    email: user.email,
  });

  await InventoryLog.create({
    itemId: item._id,
    userEmail: user.email,
    action: "CREATE",
    changes: item.toObject(),
  });

  return item;
};

const getHomeItems = async (limit: number = 6) => {
  const items = await InventoryItem.find({})
    .limit(limit)
    .sort({ createdAt: -1 })
    .lean();
  return items;
};

const getAllItems = async (query: any) => {
  const {
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
    category,
  } = query;

  // Ensure page and limit are integers
  const pageInt = parseInt(page as string, 10) || 1;
  const limitInt = parseInt(limit as string, 10) || 10;

  const findQuery = category ? { category } : {};

  const items = await InventoryItem.find(findQuery)
    .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
    .skip((pageInt - 1) * limitInt)
    .limit(limitInt)
    .lean();

  const total = await InventoryItem.countDocuments(findQuery);

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

const getItemById = async (id: string) => {
  const item = await InventoryItem.findById(id);
  return item;
};

const updateItem = async (
  id: string,
  payload: IInventoryUpdatePayload,
  user: UserPayload
) => {
  const oldItem = await InventoryItem.findById(id);

  const item = await InventoryItem.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true, runValidators: true }
  );

  if (item) {
    await InventoryLog.create({
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

const deleteItem = async (id: string, user: UserPayload) => {
  const item = await InventoryItem.findById(id);
  const result = await InventoryItem.findByIdAndDelete(id);

  if (item) {
    await InventoryLog.create({
      itemId: item._id,
      userEmail: user.email,
      action: "DELETE",
      changes: item.toObject(),
    });
  }

  return result;
};

const getUserItems = async (email: string) => {
  const items = await InventoryItem.find({ email })
    .sort({ createdAt: -1 })
    .lean();
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
