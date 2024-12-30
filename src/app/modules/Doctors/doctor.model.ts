import { model, Schema } from "mongoose";
import { TDoctor } from "./doctor.interface";

export const doctorSchema = new Schema<TDoctor>({
  doctorId: {
    type: String,
    required: [true, "Doctor ID is required"],
  },
  name: {
    type: String,
    required: [true, "Doctor name is required"],
  },
  schedule: {
    type: [Date],
    required: [true, "Available slots are required"],
  },
});

export const Doctor = model<TDoctor>("Doctor", doctorSchema);
