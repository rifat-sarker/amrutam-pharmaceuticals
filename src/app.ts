import express, { Application, Request, Response } from "express";
import { AppointmentRoutes } from "./app/modules/Appointments/appointment.route";

const app: Application = express();

//parser
app.use(express.json());

// app routes
app.use("/api", AppointmentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Amrutam Pharmaceuticals");
});

export default app;
