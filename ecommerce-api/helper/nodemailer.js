const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ach374392@gmail.com",
    pass: "xvwbnshscxtthrgg",
  },
});

// Function to send verification email
const sendVerificationEmail = async (email, verificationLink) => {
  const mailOptions = {
    from: "ach374392@gmail.com", // Sender address
    to: email, // Recipient address
    subject: "Email Verification",
    html: `
        <p>Please click the following link to verify your email address:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};
module.exports = sendVerificationEmail;
