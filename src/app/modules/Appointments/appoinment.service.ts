import { DoctorServices } from "../Doctors/doctor.service";
import { PatientServices } from "../Patient/patient.service";
import { sendNotification } from "../Utils/notificationService";
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

const rescheduleAppointment = async (id: string, patientId: string, newSlot: string) => {
  // Validate the new time slot
  const parsedSlot = new Date(newSlot);
  if (isNaN(parsedSlot.getTime())) {
    throw new Error("Invalid date format for newSlot");
  }

  // Find the appointment by ID
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new Error("Appointment not found");
  }

  // Ensure the appointment belongs to the provided patient ID
  if (appointment.patientId !== patientId) {
    throw new Error("Patient ID does not match the appointment");
  }

  // Fetch patient details from the patients database
  const patient = await PatientServices.findPatientById(patientId);
  if (!patient) {
    throw new Error("Patient not found");
  }

  // Update the appointment with the new time slot and status
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    id,
    { timeSlot: parsedSlot, status: "Rescheduled" },
    { new: true }
  );

  if (!updatedAppointment) {
    throw new Error("Error updating the appointment");
  }

  // Send reschedule notification to the patient
  await sendNotification(
    patient.email,
    "Rescheduled Appointment Notification",
    `Dear ${patient.name}, your appointment has been rescheduled to ${parsedSlot.toLocaleString()}.`
  );

  return updatedAppointment;
};
export const AppointmentServices = {
  createAppointmentIntoDB,
  getAllAppointmentFromDB,
  rescheduleAppointment,
};
