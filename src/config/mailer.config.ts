import nodemailer from "nodemailer";

const config = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

const mailer = nodemailer.createTransport(config);

export default mailer;
