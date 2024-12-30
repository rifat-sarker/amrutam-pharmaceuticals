import { Request, Response } from "express";
import { RebookingServices } from "./rebooking.service";


const rebookAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId, newSlot } = req.body; // newSlot should be in ISO format
    const updatedAppointment = await RebookingServices.rebookAppointment(
      appointmentId,
      newSlot
    );

    res.status(200).json({
      success: true,
      message: "Appointment rebooked successfully",
      data: updatedAppointment,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const RebookingController = {
  rebookAppointment,
};
