import { TAppointment } from "./appoinment.interface";
import { Appointment } from "./appointment.model";

const createAppointmentIntoDB = async (payload: TAppointment) => {
  const result = await Appointment.create(payload);
  return result;
};

const getAllAppointmentFromDB = async () => {
  const result = await Appointment.find();
  return result;
};

const rescheduleAppointment = async (id: string, newSlot: any) => {
  // Validate the newSlot
  const parsedSlot = new Date(newSlot);
  if (isNaN(parsedSlot.getTime())) {
    throw new Error("Invalid date format for newSlot");
  }

  const result = await Appointment.findByIdAndUpdate(
    id,
    { timeSlot: parsedSlot, status: "Rescheduled" },
    { new: true }
  );
  if (!result) {
    throw new Error("Appointment not found");
  }
  return result;
};

export const AppoinmentServices = {
  createAppointmentIntoDB,
  getAllAppointmentFromDB,
  rescheduleAppointment,
};
