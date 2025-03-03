import { model, Schema, Types } from "mongoose";
import { TAppointment } from "./appoinment.interface";

const appointmentSchema = new Schema<TAppointment>(
  {
    doctorId: {
      type: String,
      required: true,
    },
    patientId: {
      type: String,
    },
    timeSlot: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "No-show"],
    },
  },
  { timestamps: true }
);

export const Appointment = model<TAppointment>(
  "Appointment",
  appointmentSchema
);
