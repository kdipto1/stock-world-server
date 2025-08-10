import express from "express";
import { InventoryController } from "./inventory.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

// Public routes
router.get("/home", InventoryController.getHomeItems);

import validate from "../../middleware/validate";
import { 
  createInventoryItemSchema, 
  updateInventoryItemSchema, 
  getItemByIdSchema, 
  getAllItemsSchema 
} from "./inventory.validation";

// Protected routes
router.post(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validate(createInventoryItemSchema),
  InventoryController.createItem,
);

router.get(
  "/manage",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validate(getAllItemsSchema),
  InventoryController.getAllItems,
);

router.get(
  "/user",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  InventoryController.getUserItems,
);

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validate(getItemByIdSchema),
  InventoryController.getItemById,
);

router.put(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validate(updateInventoryItemSchema),
  InventoryController.updateItem,
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validate(getItemByIdSchema),
  InventoryController.deleteItem,
);

export const InventoryRoutes = router;
