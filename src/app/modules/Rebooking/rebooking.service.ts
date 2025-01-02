import { Appointment } from "../Appointments/appointment.model";
import { Doctor } from "../Doctors/doctor.model";

const rebookAppointment = async (appointmentId: string, newSlot: Date) => {
  // Check if the slot is available
  const appointment = await Appointment.findOne({ _id: appointmentId });
 
  if (!appointment) {
    throw new Error("Appointment not found");
  }

  const doctor = await Doctor.findOne({ doctorId: appointment.doctorId });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const isSlotAvailable = doctor.schedule.some(
    (slot) => new Date(slot).getTime() === new Date(newSlot).getTime()
  );

  if (!isSlotAvailable) {
    throw new Error("The selected slot is not available");
  }

  // Check if the slot is already booked
  const conflictingAppointment = await Appointment.findOne({
    doctorId: doctor.doctorId,
    timeSlot: new Date(newSlot),
    status: "Scheduled",
  });

  if (conflictingAppointment) {
    throw new Error("The selected slot is already booked");
  }

  // Update the appointment with the new slot
  appointment.timeSlot = new Date(newSlot);
  await appointment.save();

  return appointment;
};

export const RebookingServices = {
  rebookAppointment,
};
