import { Router } from "express";
import {
  getVehicles,
  getVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller";

const router = Router();
router.get("/", getVehicles);
router.get("/:id", getVehicle);
router.delete("/:id", deleteVehicle);

export default router;
