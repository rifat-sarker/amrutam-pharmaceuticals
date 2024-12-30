import express, { Application, Request, Response } from "express";
import { AppointmentRoutes } from "./app/modules/Appointments/appointment.route";
import { SlotFinderRoutes } from "./app/modules/SlotFinder/slot.route";
import { DoctorRoutes } from "./app/modules/Doctors/doctor.route";
import { PatientRoutes } from "./app/modules/Patient/patient.route";

const app: Application = express();

//parser
app.use(express.json());

// app routes
app.use("/api", AppointmentRoutes);
app.use("/api", SlotFinderRoutes);
app.use("/api", DoctorRoutes);
app.use("/api", PatientRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Amrutam Pharmaceuticals");
});

export default app;
