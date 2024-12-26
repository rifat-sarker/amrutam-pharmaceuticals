import { Schema } from "mongoose";
import { TDoctor } from "./doctor.interface";

export const doctorSchema = new Schema<TDoctor>({
  doctorId: String,
  name: {
    type: String,
  },
  schedule: {
    type: Date,
  },
});
