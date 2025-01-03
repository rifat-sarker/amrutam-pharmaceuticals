import nodemailer from "nodemailer";
import config from "../../config";

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: config.nodemailer_auth_user,
    pass: config.nodemailer_auth_pass,
  },
});

// Send email function
export const sendNotification = async (
  to: string,
  subject: string,
  text: string
) => {
  try {
    await transporter.sendMail({
      from: config.nodemailer_auth_user, // Sender address
      to, // Receiver email
      subject, // Subject line
      text, // Email body
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
