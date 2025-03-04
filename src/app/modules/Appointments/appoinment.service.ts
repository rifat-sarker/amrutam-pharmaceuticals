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
  await DoctorServices.bookSlot(doctorId, requestedSlot);

  const newAppointment = new Appointment({
    doctorId,
    patientId,
    patientName,
    timeSlot: requestedSlot,
    status: "Scheduled",
  });

  const result = await newAppointment.save();
  return result;
};

const getAllAppointmentFromDB = async () => {
  const result = await Appointment.find();
  return result;
};

const rescheduleAppointment = async (
  id: string,
  patientId: string,
  doctorId: string,
  newSlot: string
) => {
  const parsedSlot = new Date(newSlot);

  if (!newSlot || isNaN(parsedSlot.getTime())) {
    throw new Error("Invalid or missing date format for newSlot");
  }

  if (parsedSlot < new Date()) {
    throw new Error("Cannot reschedule to a past time slot");
  }

  const appointment = await Appointment.findById(id);
  if (!appointment) throw new Error("Appointment not found");

  if (appointment.patientId.toString() !== patientId) {
    throw new Error("Patient ID does not match the appointment");
  }

  if (appointment.doctorId.toString() !== doctorId) {
    throw new Error("Doctor ID does not match the appointment");
  }

  if (appointment.timeSlot.toISOString() === parsedSlot.toISOString()) {
    throw new Error(
      "The new slot is the same as the current slot. No need to reschedule."
    );
  }

  if (!["Scheduled", "Rescheduled"].includes(appointment.status)) {
    throw new Error(
      "This appointment cannot be rescheduled as it is completed or no-show."
    );
  }

  const conflictingAppointment = await Appointment.findOne({
    doctorId,
    timeSlot: parsedSlot,
    status: "Scheduled",
    _id: { $ne: id },
  });

  if (conflictingAppointment) {
    throw new Error("The selected time slot is already booked for this doctor");
  }

  const patient = await PatientServices.findPatientById(patientId);
  if (!patient) throw new Error("Patient not found");

  // **Use findOneAndUpdate to optimize**
  const updatedAppointment = await Appointment.findOneAndUpdate(
    { _id: id },
    { timeSlot: parsedSlot, status: "Rescheduled" },
    { new: true }
  );

  if (!updatedAppointment) throw new Error("Error updating the appointment");

  await sendNotification(
    patient.email,
    "Rescheduled Appointment Notification",
    `Dear ${
      patient.name
    }, your appointment has been rescheduled to ${parsedSlot.toLocaleString()}.`
  );

  return updatedAppointment;
};

export const AppointmentServices = {
  createAppointmentIntoDB,
  getAllAppointmentFromDB,
  rescheduleAppointment,
};
