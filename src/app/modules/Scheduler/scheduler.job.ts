import nodeSchedule from "node-schedule";
import { Appointment } from "../Appointments/appointment.model";
import { PatientServices } from "../Patient/patient.service";
import { sendNotification } from "../Utils/notificationService";

export const startScheduler = () => {
 nodeSchedule.scheduleJob("* * * * *", async () => {
   // Runs every minute
   const now = new Date();
   console.log(`[Scheduler] Running job at: ${now.toISOString()}`);

   try {
     const missedAppointments = await Appointment.find({
       status: { $in: ["Scheduled", "Rescheduled"] }, // Check for both statuses
       timeSlot: { $lt: new Date(now.getTime() - 2 * 60 * 1000) }, // Check if it's past 2 minutes
     });

     if (missedAppointments.length) {
       console.log(
         `[Scheduler] Found ${missedAppointments.length} missed appointment(s).`
       );

       for (const appointment of missedAppointments) {
         appointment.status = "No-show";
         await appointment.save();

         const patient = await PatientServices.findPatientById(
           appointment.patientId
         );

         if (patient) {
           await sendNotification(
             patient.email,
             "Missed Appointment Notification",
             `Dear ${patient.name}, you missed your appointment. Please reschedule it at your earliest convenience.`
           );
         }
       }
     } else {
       console.log("[Scheduler] No missed appointments found.");
     }
   } catch (error) {
     console.error("[Scheduler] Error:", error);
   }
 });

  console.log("[Scheduler] Scheduler started.");
};
