import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const sendEmail = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rabin.yaniv@gmail.com",
        pass: "randompassword",
      },
    });

    const mailOptions = {
      from: email,
      to: "rabin.yaniv@gmail.com",
      subject: `New Message from ${name}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Email could not be sent" });
  }
}
