import { Router } from "express";
import { RebookingController } from "./rebooking.controller";

const router = Router();

router.post("/rebooking", RebookingController.rebookAppointment);

export const RebookingRoutes = router;
