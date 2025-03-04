import { Appointment } from "../Appointments/appointment.model";
import { TDoctor } from "./doctor.interface";
import { Doctor } from "./doctor.model";

// Create a doctor with availability
const createDoctorWithAvailability = async (
  doctorId: string,
  name: string,
  availableSlots: Date[]
) => {
  const newDoctor = new Doctor({
    doctorId,
    name,
    schedule: availableSlots,
    availableSlots,
  });

  const result = await Doctor.create(newDoctor);
  return result;
};

// Function to calculate available slots
const calculateAvailableSlots = async (doctorId: string) => {
  const doctor = await Doctor.findOne({ doctorId });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const appointments = await Appointment.find({
    doctorId,
    status: "Scheduled",
  });

  const bookedSlots = appointments.map((appt) => appt.timeSlot);
  const availableSlots = doctor.schedule.filter(
    (slot) => !bookedSlots.some((booked) => booked.getTime() === slot.getTime())
  );

  doctor.availableSlots = availableSlots;
  await doctor.save();

  return availableSlots;
};

// Function to check and book a requested slot
const bookSlot = async (doctorId: string, requestedSlot: Date) => {
  const doctor = await Doctor.findOne({ doctorId });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  if (
    !doctor.availableSlots.some(
      (slot) => slot.getTime() === requestedSlot.getTime()
    )
  ) {
    throw new Error("Slot already booked or unavailable.");
  }

  // Update the doctor's available slots after booking
  doctor.availableSlots = doctor.availableSlots.filter(
    (slot) => slot.getTime() !== requestedSlot.getTime()
  );
  await doctor.save();

  return doctor;
};

export const DoctorServices = {
  createDoctorWithAvailability,
  calculateAvailableSlots,
  bookSlot,
};
