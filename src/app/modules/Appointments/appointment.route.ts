import { Router } from "express";
import { AppointmentController } from "./appoinment.controller";

const router = Router();

router.post("/appointments", AppointmentController.createAppointment);
router.get("/appointments", AppointmentController.getAllAppointment);
router.put(
  "/appointments/:id/reschedule",
  AppointmentController.rescheduleAppointment
);

export const AppointmentRoutes = router;
