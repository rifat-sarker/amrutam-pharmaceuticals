import { Request, Response } from "express";
import { RebookingServices } from "./rebooking.service";
import moment from "moment";


const rebookAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId, newSlot } = req.body;

    // Validate newSlot format (ISO)
    if (!moment(newSlot, moment.ISO_8601, true).isValid()) {
      throw new Error(
        "Invalid date format for newSlot. Please provide a valid ISO date."
      );
    }

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
