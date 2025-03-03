import { Appointment } from "../Appointments/appointment.model";
import { TDoctor } from "./doctor.interface";
import { Doctor } from "./doctor.model";
import moment from "moment";

// Create a doctor with availability
const createDoctorWithAvailability = async (
  doctorId: string,
  name: string,
  availableSlots: string[]
) => {
  const formattedSlots = availableSlots.map((slot) =>
    moment(slot, "YYYY-MM-DD hh.mm A").toISOString()
  );

  const newDoctor = new Doctor({
    doctorId,
    name,
    schedule: formattedSlots,
    availableSlots: formattedSlots,
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

  const bookedSlots = appointments.map((appt) =>
    moment(appt.timeSlot).toISOString()
  );
  const availableSlots = doctor.schedule.filter(
    (slot) => !bookedSlots.includes(moment(slot).toISOString())
  );

  doctor.availableSlots = availableSlots;
  await doctor.save();

  return availableSlots.map((slot) =>
    moment(slot).format("YYYY-MM-DD hh.mm A")
  );
};

// Function to check and book a requested slot
const bookSlot = async (doctorId: string, requestedSlot: string) => {
  const doctor = await Doctor.findOne({ doctorId });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const formattedRequestedSlot = moment(
    requestedSlot,
    "YYYY-MM-DD hh.mm A"
  ).toISOString();

  if (!doctor.availableSlots.includes(formattedRequestedSlot)) {
    throw new Error("Slot already booked or unavailable.");
  }

  // Update the doctor's available slots after booking
  doctor.availableSlots = doctor.availableSlots.filter(
    (slot) => slot !== formattedRequestedSlot
  );
  await doctor.save();

  return doctor;
};

export const DoctorServices = {
  createDoctorWithAvailability,
  calculateAvailableSlots,
  bookSlot,
};
