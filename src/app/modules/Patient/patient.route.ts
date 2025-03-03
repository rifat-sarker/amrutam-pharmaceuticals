import { Router } from "express";
import { PatientController } from "./patient.controller";

const router = Router();

router.post("/patients", PatientController.createPatient);

export const PatientRoutes = router;
