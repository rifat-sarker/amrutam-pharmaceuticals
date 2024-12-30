import { model, Schema } from "mongoose";
import { TPatient } from "./patient.interface";

const patientSchema = new Schema<TPatient>(
  {
    name: {
      type: String,
      required: [true, "Patient name is required"],
    },
    email: {
      type: String,
      required: [true, "Patient email is required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Patient phone number is required"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Patient date of birth is required"],
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);


// Creating the Patient model
export const Patient = model<TPatient>("Patient", patientSchema);