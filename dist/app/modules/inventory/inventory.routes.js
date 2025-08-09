"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const inventory_controller_1 = require("./inventory.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
// Public routes
router.get("/home", inventory_controller_1.InventoryController.getHomeItems);
const validate_1 = __importDefault(require("../../middleware/validate"));
const inventory_validation_1 = require("./inventory.validation");
// Protected routes
router.post("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validate_1.default)(inventory_validation_1.createInventoryItemSchema), inventory_controller_1.InventoryController.createItem);
router.get("/manage", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validate_1.default)(inventory_validation_1.getAllItemsSchema), inventory_controller_1.InventoryController.getAllItems);
router.get("/user", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), inventory_controller_1.InventoryController.getUserItems);
router.get("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validate_1.default)(inventory_validation_1.getItemByIdSchema), inventory_controller_1.InventoryController.getItemById);
router.put("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validate_1.default)(inventory_validation_1.updateInventoryItemSchema), inventory_controller_1.InventoryController.updateItem);
router.delete("/:id", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.USER), (0, validate_1.default)(inventory_validation_1.getItemByIdSchema), inventory_controller_1.InventoryController.deleteItem);
exports.InventoryRoutes = router;
