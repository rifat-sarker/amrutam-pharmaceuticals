import { TDoctor } from "./doctor.interface";
import { Doctor } from "./doctor.model";

// Create a doctor with availability
const createDoctorWithAvailability = async (
  doctorId: string,
  name: string,
  availableSlots: Date[]
) => {
  const newDoctor = new Doctor({
    doctorId,
    name,
    schedule: availableSlots, 
  });

  const result = await Doctor.create(newDoctor);
  return result;
};

export const DoctorServices = {
  createDoctorWithAvailability,
};
