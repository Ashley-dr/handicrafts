const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../model/Users");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const router = express.Router();
const path = require("path");
const Users = require("../model/Users");
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
      isSeller: "null",
      isStaff: "null",
      isAdmin: "null",
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
      return res
        .status(400)
        .json({ status: "error", message: "Account not exists" });
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
    console.log("Received email:", email);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_APP_EMAIL,
      },
    });

    const mailView = `
      <html>
        <body>
          <h2>Password Reset</h2>
          <p>You've requested to reset your password from Handicraft Account</p>
          <br/>
          <p>Reset Code</p>
          <br/>
           <p>Valid for 1 Hour.</p>
          <br/>
          <p>
           ${resetToken}
          </p>
          <br/>
          <p>If you didn't request to reset, ignore this email.</p>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset",
      html: mailView,
    });

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error("Error in forgot-password route:", error);
    res.status(500).json({ message: "Error sending password reset email" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or token Expired" });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    user.password = hashedPass;
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

router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/user-update/:id", async (req, res) => {
  try {
    const { isNewSeller } = req.body;
    const users = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/user-delete/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User removed." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
