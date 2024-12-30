import nodeSchedule from "node-schedule";
import { Appointment } from "../Appointments/appointment.model";
import { sendNotification } from "../Utils/notificationService";
import { PatientServices } from "../Patient/patient.service";

// Scheduler job to detect No-Shows and send notifications
nodeSchedule.scheduleJob("*/15 * * * *", async () => {
  const now = new Date(); // Get the current date and time

  try {
    // Find appointments that are scheduled and their timeSlot is older than 15 minutes
    const missedAppointments = await Appointment.find({
      status: "Scheduled",
      timeSlot: { $lt: new Date(now.getTime() - 15 * 60 * 1000) }, // Missed appointments
    });

    if (missedAppointments.length > 0) {
      console.log(`${missedAppointments.length} missed appointment(s) found.`);

      // Loop through each missed appointment and update its status
      for (const appointment of missedAppointments) {
        // Update the appointment status to "No-show"
        appointment.status = "No-show";
        await appointment.save();

        // Find the patient by their ID (assuming the patientId field exists in Appointment)
        const patient = await PatientServices.findPatientById(
          appointment.patientId
        );

        if (patient) {
          // Send a notification to the patient about the missed appointment
          await sendNotification(
            patient.email,
            "Missed Appointment Notification",
            `Dear ${patient.name}, you missed your scheduled appointment. Please reschedule at your earliest convenience.`
          );
          console.log(`Notification sent to: ${patient.email}`);
        } else {
          console.log("Patient not found for appointment:", appointment._id);
        }
      }
    } else {
      console.log("No missed appointments at this time.");
    }
  } catch (error) {
    console.error("Error in scheduler job:", error);
  }
});
