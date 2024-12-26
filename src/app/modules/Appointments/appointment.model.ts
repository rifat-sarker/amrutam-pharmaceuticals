import { Schema, Types } from "mongoose";
import { TAppointment } from "./appoinment.interface";

export const appointmentSchema = new Schema<TAppointment>({
  doctorId: String,
  patientId: String,
  timeSlot: Date,
  status: {
    type: String,
    default: "Scheduled",
  },
});

