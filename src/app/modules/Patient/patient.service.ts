import { Patient } from "./patient.model";
import { TPatient } from "./patient.interface";

const createPatient = async (payload: TPatient) => {
  const newPatient = new Patient(payload);
  await newPatient.save();
  return newPatient;
};

// Function to find a patient by email
const findPatientByEmail = async (email: string) => {
  const patient = await Patient.findOne({ email });
  return patient;
};

// Function to find a patient by ID
const findPatientById = async (id: string) => {
  const patient = await Patient.findById(id);  // Use the MongoDB findById method
  return patient;
};
  
export const PatientServices = {
  createPatient,
  findPatientByEmail,
  findPatientById
};
