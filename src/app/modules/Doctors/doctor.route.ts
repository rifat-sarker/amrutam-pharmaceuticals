import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const router = Router();
router.post("/doctors", DoctorController.createDoctorWithAvailability);
// Route to calculate available slots
router.get(
  "/:doctorId/available-slots",
  DoctorController.calculateAvailableSlots
);

// Route to book a slot
router.post("/:doctorId/book-slot", DoctorController.bookSlot);

export const DoctorRoutes = router;
