import nodeMailer from 'nodemailer';

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodeMailer.createTransport({
    service: "gmail", 
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });
  
  export const sendEmail = async (to, subject, html) => {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
      };
  
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };