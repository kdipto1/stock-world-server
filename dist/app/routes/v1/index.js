"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../../modules/auth/auth.routes");
const inventory_routes_1 = require("../../modules/inventory/inventory.routes");
const user_routes_1 = require("../../modules/user/user.routes");
const router = express_1.default.Router();
const dashboard_routes_1 = require("../../modules/dashboard/dashboard.routes");
const defaultRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/users",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/inventory",
        route: inventory_routes_1.InventoryRoutes,
    },
    {
        path: "/dashboard",
        route: dashboard_routes_1.DashboardRoutes,
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
