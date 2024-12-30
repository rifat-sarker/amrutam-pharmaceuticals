import { Request, Response } from "express";
import { SlotServices } from "./slot.service";

const getAvailableSlots = async (req: Request, res: Response) => {
  try {
    const {doctorId}  = req.params;
    const result = await SlotServices.getAvailableSlots(doctorId);
    res.status(201).json({
      success: true,
      message: "Available slots fetched successfully",
      result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const SlotController = {
  getAvailableSlots,
};
