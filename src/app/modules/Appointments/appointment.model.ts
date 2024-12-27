import { model, Schema, Types } from "mongoose";
import { TAppointment } from "./appoinment.interface";

const appointmentSchema = new Schema<TAppointment>({
  doctorId: {
    type: String,
    required: true
  },
  patientId: {
    type: String,
    required: true
  },
  timeSlot: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "Scheduled",
  },
});

export const Appointment = model<TAppointment>(
  "Appointment",
  appointmentSchema
);
