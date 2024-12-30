import { Appointment } from "../Appointments/appointment.model";
import { Doctor } from "../Doctors/doctor.model";

const getAvailableSlots = async (doctorId: string) => {
  const doctor = await Doctor.findOne({ doctorId });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  // Fetch booked slots for the doctor
  const bookedSlots = await Appointment.find({
    doctorId,
    status: "Scheduled",
  }).select("timeSlot");

  // Filter available slots by excluding booked slots
  const availableSlots = doctor.schedule.filter(
    (slot) =>
      !bookedSlots.some((appt) => appt.timeSlot.getTime() === slot.getTime())
  );
  return availableSlots;
};

export const SlotServices = {
  getAvailableSlots,
};
