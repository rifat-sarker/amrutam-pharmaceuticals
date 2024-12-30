import nodemailer from "nodemailer";

// Create a transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "rifatswd@gmail.com",
    pass: "jglr lxlo dbya ezcj",
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
      from: "rifatswd@gmail.com", // Sender address
      to, // Receiver email
      subject, // Subject line
      text, // Email body
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
