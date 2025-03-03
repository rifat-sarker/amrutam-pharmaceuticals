import { Request, Response } from "express";
import { PatientServices } from "./patient.service";

const createPatient = async (req: Request, res: Response) => {
  try {
    const patientData = req.body;
    const newPatient = await PatientServices.createPatient(patientData);
    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      result: newPatient,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const PatientController = {
  createPatient,
};
