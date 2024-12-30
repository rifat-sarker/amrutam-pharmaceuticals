import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const router = Router();
router.post("/doctors", DoctorController.createDoctorWithAvailability);

export const DoctorRoutes = router;
