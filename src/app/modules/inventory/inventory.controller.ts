import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import { InventoryService } from "./inventory.service";
import httpStatus from "http-status";
import { UserPayload } from "../../../interfaces/user.payload";
import ApiError from "../../../errors/ApiError";

const createItem = catchAsync(async (req: Request, res: Response) => {
  const user = (req as Request & { user: UserPayload }).user;
  const result = await InventoryService.createItem(user, req.body);
  
  res.status(httpStatus.CREATED).json({
    success: true,
    message: "Item created successfully",
    data: result,
  });
});

const getHomeItems = catchAsync(async (req: Request, res: Response) => {
  const result = await InventoryService.getHomeItems();
  
  res.status(httpStatus.OK).json({
    success: true,
    message: "Home items retrieved successfully",
    data: result,
  });
});

const getAllItems = catchAsync(async (req: Request, res: Response) => {
  const result = await InventoryService.getAllItems();
  
  res.status(httpStatus.OK).json({
    success: true,
    message: "All items retrieved successfully",
    data: result,
  });
});

const getItemById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InventoryService.getItemById(id);
  
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Item not found");
  }
  
  res.status(httpStatus.OK).json({
    success: true,
    message: "Item retrieved successfully",
    data: result,
  });
});

const updateItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InventoryService.updateItem(id, req.body);
  
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Item not found");
  }
  
  res.status(httpStatus.OK).json({
    success: true,
    message: "Item updated successfully",
    data: result,
  });
});

const deleteItem = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await InventoryService.deleteItem(id);
  
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Item not found");
  }
  
  res.status(httpStatus.OK).json({
    success: true,
    message: "Item deleted successfully",
    data: result,
  });
});

const getUserItems = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await InventoryService.getUserItems(email as string);
  
  res.status(httpStatus.OK).json({
    success: true,
    message: "User items retrieved successfully",
    data: result,
  });
});

export const InventoryController = {
  createItem,
  getHomeItems,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getUserItems,
};
