import { Types } from "mongoose";

export type TAppointment = {
    doctorId : string;
    patientId: string;
    timeSlot : Date;
    status: string;
}