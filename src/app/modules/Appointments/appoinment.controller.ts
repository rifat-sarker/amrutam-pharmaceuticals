import { Request, Response } from "express";
import { AppointmentServices } from "./appoinment.service";
import moment from "moment";

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
    const { newSlot, patientId } = req.body;
    console.log("Received request body:", req.body);

    // Convert newSlot to date using moment and format it
    const parsedSlot = moment(newSlot, "YYYY-MM-DD hh.mm A").toDate();

    const result = await AppointmentServices.rescheduleAppointment(
      id,
      patientId,
      moment(parsedSlot).format("YYYY-MM-DD hh:mm A")
    );
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
