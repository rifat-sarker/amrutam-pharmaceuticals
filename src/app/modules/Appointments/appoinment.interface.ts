export type TAppointment = {
  doctorId: string;
  patientId: string;
  timeSlot: Date;
  status: "Scheduled" | "Completed" | "No-show";
};
