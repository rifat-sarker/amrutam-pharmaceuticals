import { Appointment } from "../Appointments/appointment.model";
import { Doctor } from "../Doctors/doctor.model";

const getAvailableSlots = async (doctorId: string) => {
  const doctor = await Doctor.findOne({ doctorId });
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  const bookedSlots = await Appointment.find({
    doctorId,
    status: "Scheduled",
  }).select("timeSlot");

  const availableSlots = doctor.schedule.filter(
    (slot) =>
      !bookedSlots.some(
        (appt) => new Date(appt.timeSlot).getTime() === new Date(slot).getTime()
      )
  );

  return availableSlots;
};

export const SlotServices = {
  getAvailableSlots,
};
