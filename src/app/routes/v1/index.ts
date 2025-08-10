import express, { Router } from "express";
import { AuthRoutes } from "../../modules/auth/auth.routes";
import { InventoryRoutes } from "../../modules/inventory/inventory.routes";
import { UserRoutes } from "../../modules/user/user.routes";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

import { DashboardRoutes } from "../../modules/dashboard/dashboard.routes";

const defaultRoutes: IRoute[] = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/inventory",
    route: InventoryRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
