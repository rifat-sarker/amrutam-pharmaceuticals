import { Request, Response } from "express";
import { DoctorServices } from "./doctor.service";
import moment from "moment";

// Create a doctor with availability
const createDoctorWithAvailability = async (req: Request, res: Response) => {
  try {
    const { doctorId, name, availableSlots } = req.body;
    const result = await DoctorServices.createDoctorWithAvailability(
      doctorId,
      name,
      availableSlots
    );
    res.status(201).json({
      success: true,
      message: "Doctor created with availability",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }

};


// Calculate available slots
const calculateAvailableSlots = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const availableSlots = await DoctorServices.calculateAvailableSlots(doctorId);
    res.status(200).json({
      success: true,
      message: "Available slots calculated",
      availableSlots,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Book a slot
const bookSlot = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const { requestedSlot } = req.body;
    const formattedSlot = moment(requestedSlot).format("YYYY-MM-DD hh:mm A");
    const result = await DoctorServices.bookSlot(doctorId, formattedSlot);
    res.status(200).json({
      success: true,
      message: "Slot booked successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const DoctorController = {
  createDoctorWithAvailability,
  calculateAvailableSlots,
  bookSlot
};
