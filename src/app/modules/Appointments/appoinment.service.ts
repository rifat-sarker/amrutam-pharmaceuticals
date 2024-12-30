import { DoctorServices } from "../Doctors/doctor.service";
import { TAppointment } from "./appoinment.interface";
import { Appointment } from "./appointment.model";

// Create an appointment (book the slot and save the appointment)
const createAppointmentIntoDB = async (
  doctorId: string,
  patientId: string,
  patientName: string,
  requestedSlot: Date
) => {
  // Step 1: Book the slot (update the doctor's available slots)
  await DoctorServices.bookSlot(doctorId, requestedSlot);

  // Step 2: Create the appointment
  const newAppointment = new Appointment({
    doctorId,
    patientId,
    patientName,
    timeSlot: requestedSlot,
    status: "Scheduled", // Default status
  });

  const result = await newAppointment.save();
  return result;
};

const getAllAppointmentFromDB = async () => {
  const result = await Appointment.find();
  return result;
};

// Reschedule appointment logic
const rescheduleAppointment = async (id: string, newSlot: any) => {
  // Validate the newSlot
  const parsedSlot = new Date(newSlot);
  if (isNaN(parsedSlot.getTime())) {
    throw new Error("Invalid date format for newSlot");
  }

  // Find the appointment by ID and get the patientId
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new Error("Appointment not found");
  }

  // Ensure that the patientId matches (i.e., patient is the same)
  const patientId = appointment.patientId; // Assuming patientId is stored in appointment
  if (!patientId) {
    throw new Error("No patient found for this appointment");
  }

  const result = await Appointment.findByIdAndUpdate(
    id,
    { timeSlot: parsedSlot, status: "Rescheduled" },
    { new: true }
  );

  return result;
};
export const AppointmentServices = {
  createAppointmentIntoDB,
  getAllAppointmentFromDB,
  rescheduleAppointment,
};
