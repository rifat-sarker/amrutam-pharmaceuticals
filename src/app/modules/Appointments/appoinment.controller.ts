import { Request, Response } from "express";
import { AppointmentServices } from "./appoinment.service";

// create appointments
const createAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorId, patientId, patientName, requestedSlot } = req.body;

    const result = await AppointmentServices.createAppointmentIntoDB(
      doctorId,
      patientId,
      patientName,
      new Date(requestedSlot) 
    );

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// get all appointments
const getAllAppointment = async (req: Request, res: Response) => {
  try {
    const result = await AppointmentServices.getAllAppointmentFromDB();
    // console.log(result);
    res.status(200).json({
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
    const { newSlot, patientId, doctorId } = req.body;
    console.log("Received request body:", req.body);

    const result = await AppointmentServices.rescheduleAppointment(
      id,
      patientId,
      doctorId, 
      newSlot
    );
    res.status(200).json({
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
