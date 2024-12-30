import { Request, Response } from "express";
import { DoctorServices } from "./doctor.service";

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

export const DoctorController = {
  createDoctorWithAvailability,
};
