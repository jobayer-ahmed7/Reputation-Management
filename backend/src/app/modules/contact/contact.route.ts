import express from "express";
import nodemailer from "nodemailer";
import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import {sendResponse} from "../../utils/sendResponse";
import httpStatus from "http-status";

const router = express.Router();

// submit message
router.post(
  "/submit-message",
  catchAsync(async (req, res) => {

    // console.log(req.body)

    const { name, email, whatsapp, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.gmail_user as string,
        pass: config.gmail_app_password as string,
      },
    });

    await transporter.verify();

    const mailOptions = {

      from: `"Reputation Manage Contact" <${config.gmail_user}>`,
      to: "jobayerahmed.dev@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; padding: 20px; border-radius: 10px;">
          <h2 style="color: #017aff; border-bottom: 2px solid #017aff; padding-bottom: 10px;">New Inquiry Received</h2>
          
          <div style="margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp || "Not provided"}</p>
          </div>

          <div style="margin-top: 20px; background-color: #f8fafc; padding: 15px; border-radius: 5px;">
            <p><strong>Message/Query:</strong></p>
            <p style="white-space: pre-wrap; color: #334155;">${message}</p>
          </div>

          <p style="margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center;">
            This email was sent from the Reputation Manage Contact Form.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
// console.log("mail sent")
    sendResponse.sendDataResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Message sent successfully!",
      data: null,
    });
  })
);

export const ContactRouter = router;
