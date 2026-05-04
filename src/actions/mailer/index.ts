"use server";
import nodemailer from "nodemailer";

export const onMailer = (email: string, customerEmail: string | null) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODE_MAILER_EMAIL,
      pass: process.env.NODE_MAILER_GMAIL_APP_PASSWORD,
    },
  });
  const mailOptions = {
    to: email,
    subject: "Real-time Support Notification",
    text: `Dear Team,\n\nThis is to inform you that one of your customer , ${customerEmail} has requested Real-time Support mode on Vend AI.\n\nBest regards,\nVend AI System`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ", info.response);
    }
  });
};
