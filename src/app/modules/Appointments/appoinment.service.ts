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

export const AppoinmentServices = {
  createAppointmentIntoDB,
  getAllAppointmentFromDB,
};
