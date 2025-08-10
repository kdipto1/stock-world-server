
import express from "express";
import { DashboardController } from "./dashboard.controller";
import auth from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get(
  "/stats",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  DashboardController.getDashboardStats,
);

export const DashboardRoutes = router;
