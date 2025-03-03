import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  database_url: process.env.DATABASE_URI,
  port: process.env.PORT,
  nodemailer_auth_user: process.env.NODEMAILER_AUTH_USER,
  nodemailer_auth_pass: process.env.NODEMAILER_AUTH_PASS,
};
