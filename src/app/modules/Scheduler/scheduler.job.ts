import nodeSchedule from "node-schedule";
import { Appointment } from "../Appointments/appointment.model";
import { PatientServices } from "../Patient/patient.service";
import { sendNotification } from "../Utils/notificationService";

export const startScheduler = () => {
  nodeSchedule.scheduleJob("*/15 * * * *", async () => {
    const now = new Date();
    console.log(`[Scheduler] Running job at: ${now.toISOString()}`);

    try {
      const missedAppointments = await Appointment.find({
        status: "Scheduled",
        timeSlot: { $lt: new Date(now.getTime() - 15 * 60 * 1000) },
      });

      if (missedAppointments.length) {
        console.log(`[Scheduler] Found ${missedAppointments.length} missed appointment(s).`);

        for (const appointment of missedAppointments) {
          appointment.status = "No-show";
          await appointment.save();
          const patient = await PatientServices.findPatientById(appointment.patientId);

          if (patient) {
            await sendNotification(
              patient.email,
              "Missed Appointment Notification",
              `Dear ${patient.name}, you missed your appointment. Please reschedule.`
            );
            await rescheduleNotification(appointment, patient);
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

const rescheduleNotification = async (appointment: any, patient: any) => {
  try {
    const newTimeSlot = new Date(appointment.timeSlot.getTime() + 60 * 60 * 1000); // 1 hour later
    const updatedAppointment = await Appointment.findByIdAndUpdate(appointment._id, {
      timeSlot: newTimeSlot,
      status: "Rescheduled",
    }, { new: true });

    if (updatedAppointment) {
      await sendNotification(
        patient.email,
        "Rescheduled Appointment Notification",
        `Your appointment has been rescheduled to ${newTimeSlot.toLocaleString()}.`
      );
      return updatedAppointment;
    }
    return null;
  } catch (error) {
    console.error("[Scheduler] Error rescheduling appointment:", error);
    return null;
  }
};
