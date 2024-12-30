import { Request, Response } from "express";
import { AppoinmentServices } from "./appoinment.service";

// create appointments
const createAppointment = async (req: Request, res: Response) => {
  try {
    // console.log(req.body);
    const result = await AppoinmentServices.createAppointmentIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: " Appoinment created",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get all appointments
const getAllAppointment = async (req: Request, res: Response) => {
  try {
    const result = await AppoinmentServices.getAllAppointmentFromDB();
    console.log(result);
    res.status(201).json({
      success: true,
      message: "Appointments retrieved successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// reschedule appointment
const rescheduleAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newSlot } = req.body;

    const result = await AppoinmentServices.rescheduleAppointment(id, newSlot);
    res.status(201).json({
      success: true,
      message: "Appointment rescheduled successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const AppointmentController = {
  createAppointment,
  getAllAppointment,
  rescheduleAppointment,
};
