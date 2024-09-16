const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../model/Users");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();
router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { email, password, fullname, phoneNumber } = req.body;

    const ifExist = await User.findOne({ email: email });

    if (ifExist) {
      return res.status(400).json({ error: "Email Already Exist" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = new User({
      fullname,
      email,
      phoneNumber,
      password: hashedPass,
    });
    await user.save();
    res.status(201).json({ message: "Sign up successfull" });
  } catch (error) {
    res.status(500).json({ message: "Error creating account" });
  }
});
const JWT_SECRET = "2525252525";
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ data: "Account not exists" });
    }
    // console.log("Stored hashed password:", user.password);
    // console.log("Provided password:", password);
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const token = jwt.sign({ email: user.email }, JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60, // 3 days
      });

      return res.status(200).json({ status: "ok", data: token });
    } else {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid password" });
    }
  } catch (error) {
    console.log("Error signing in:", error);
    return res.status(500).json({ message: "Error signing in" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const resetToken = jwt.sign({ userId: user._id }, 252525, {
      expiresIn: "1h",
    });

    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    // const mailView = (
    //   <html>
    //     <body>
    //       <h2>Password Reset</h2>
    //       <p>You've requested to reset your password from Handicraft Account</p>
    //       <p>
    //         Please continue to reset password{" "}
    //         <a href="http://localhost:8081/reset-password">Reset Password</a>
    //       </p>
    //       <p>If you didn't request to reset, ignore this email.</p>
    //     </body>
    //   </html>
    // );
    await transporter.sendMail({
      from: '"HANDICRAFT"',
      to: email,
      subject: "Password Reset",
      html: `Click <a href="http://192.168.0.18:8000/reset-password/${resetToken}">here</a> to reset your password.`,
    });
    res.status(201).json({ message: "Email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error to send email" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or token Expired" });
    }
    const hashedPass = await bcrypt.hash(newPassword, 10);
    user.hashedPass = hashedPass;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    res.json({ message: "Password changed successful" });
  } catch (error) {
    res.status(500).json({ message: "Error to change password" });
  }
});
router.post("/user-data", async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "ok", data: data });
    });
  } catch (error) {
    console.log("Error receiving user data");
  }
});
module.exports = router;
