
import nodemailer from "nodemailer";
import type { LoaderFunction } from "react-router";

// Verify API Key
const VALID_API_KEY = process.env.API_KEY || "uiouoilakjddaljsawfhalsdfhjakle";

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
        user: "creativetourguruthailand@gmail.com",
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

// Optional: For other email services, use this format instead:
/*
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});
*/

interface SendEmailRequest {
    to: string;
    subject: string;
    html: string;
    cc?: string;
    bcc?: string;
}

export const action: LoaderFunction = async ({ request }) => {
    // Only accept POST requests
    if (request.method !== "POST") {
        return Response.json(
            { error: "Method not allowed" },
            { status: 405 }
        );
    }

    try {
        // Verify API Key
        const apiKey = request.headers.get("x-api-key");
        if (apiKey !== VALID_API_KEY) {
            return Response.json(
                { error: "Unauthorized - Invalid API Key" },
                { status: 401 }
            );
        }

        // Parse request body
        const body = await request.json() as SendEmailRequest;
        const { to, subject, html, cc, bcc } = body;

        // Validate required fields
        if (!to || !subject || !html) {
            return Response.json(
                {
                    error: "Missing required fields: to, subject, html"
                },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            return Response.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        // Send email
        const info = await transporter.sendMail({
            from: `"Creative Tour Guru" <${process.env.EMAIL_USER}>`,
            to,
            cc,
            bcc,
            subject,
            html,
        });

        console.log("Email sent successfully:", info.messageId);

        return Response.json(
            {
                success: true,
                message: "Email sent successfully",
                messageId: info.messageId,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Failed to send email:", error);

        // Check for common nodemailer errors
        if (error instanceof Error) {
            if (error.message.includes("EAUTH")) {
                return Response.json(
                    { error: "Email authentication failed. Check credentials." },
                    { status: 500 }
                );
            }
            if (error.message.includes("ECONNREFUSED")) {
                return Response.json(
                    { error: "Email service connection failed." },
                    { status: 503 }
                );
            }
        }

        return Response.json(
            { error: "Failed to send email" },
            { status: 500 }
        );
    }
};