import express, { Router } from "express";
import { AuthRoutes } from "../../modules/auth/auth.routes";
import { InventoryRoutes } from "../../modules/inventory/inventory.routes";

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultRoutes: IRoute[] = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/inventory",
    route: InventoryRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
