import nodemailer from "nodemailer";
import { generateToken } from "..";

// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: "Flav-Ur email team <flav.ur@gmail.com>",
      to,
      subject,
      html,
    });

    console.log("Email sent: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const signupEmail = async (newUser: any) => {
  try {
    const verificationToken = generateToken(newUser._id, newUser.username);
    const url = `${process.env.DOMAIN}/verify-user?token=${verificationToken}`;

    let body = `<!DOCTYPE html>
        <html>
        <head>
            <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f9f9f9;
                color: #333;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                color: #fff;
                background: #007bff;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 15px;
            }
            .button:hover {
                background: #0056b3;
            }
            </style>
        </head>
        <body>
            <div class="container">
            <h2>Hello ${newUser?.name}!</h2>
            <p>Welcome to <strong>Flav-Ur</strong>! We're thrilled to have you on board.</p>
            <p>Verify your email to start exploring delicious recipes and amazing features:</p>
            <a href="${url}" class="button">Verify Email</a>
            </div>
        </body>
        </html>`;

    const subject = `Welcome email from Flav-Ur`;

    return await sendEmail(newUser?.email, subject, body);
  } catch (error) {
    console.log(error);
    return false;
  }
};
