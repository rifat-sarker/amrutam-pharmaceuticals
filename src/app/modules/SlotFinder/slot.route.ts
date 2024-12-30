import { Router } from "express";
import { SlotController } from "./slot.controller";

const router = Router();
router.get("/slots/available/:doctorId", SlotController.getAvailableSlots);

export const SlotFinderRoutes = router;
