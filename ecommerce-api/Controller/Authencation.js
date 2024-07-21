const { hash } = require("bcryptjs");
const bcrypt = require("bcryptjs");
const UserModel = require("../Models/User-Model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
var validator = require("email-validator");
const sendVerificationEmail = require("../helper/nodemailer");
const Token = require("../Models/Token");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
var passport = require("passport");
var { v4: uuidv4 } = require("uuid");
const RegisterAuthencation = async (req, res) => {
  const { fullname, username, email, password } = req.body;

  const isEmail = validator.validate(email);

  try {
    // Check if the email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser && existingUser.isVerified) {
      return res.status(409).json({ message: "Email already exists" });
    }

    if (!isEmail) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (fullname.length <= 6 || username.length <= 6 || password.length <= 6) {
      return res
        .status(400)
        .json({ message: "Minimum 6 characters are required" });
    }

    // Hash the password
    const bcryptPassword = await hash(password, 10);

    // Create a new user
    const user = new UserModel({
      fullname,
      username,
      email,
      sub: uuidv4(),
      password: bcryptPassword,
    });

    await user.save();

    if (!user.isVerified) {
      const token = new Token({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
      await token.save();

      const verificationLink = `https://frontend-eight-zeta-18.vercel.app/auth/verifiy/${token.token}`;
      await sendVerificationEmail(email, verificationLink);

      return res
        .status(200)
        .json({ message: "Verification email sent. Please check your email" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const LoginAuthencation = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email && password) {
      const bcryptPassword = await UserModel.findOne({ email: email });
      if (bcryptPassword) {
        const decryptPassword = await bcrypt.compare(
          password,
          bcryptPassword.password
        ); // Assuming the hashed password is stored in a field named "password"

        if (!decryptPassword) {
          res
            .status(404)
            .json({ message: "Please Provide a Correct Email Or Password " });
        } else {
          if (bcryptPassword?.isVerified) {
            const token = jwt.sign({ userId: bcryptPassword._id }, "AHsa@123");
            res
              .status(200)
              .json({ message: "User is Login Successfully", token: token });
          } else {
            res.status(404).json({ message: "Your Email is Not Verified" });
          }
        }
      } else {
        res.status(404).json({ message: "User is  not found" });
      }
    } else {
      res
        .status(400)
        .json({ message: "Please Provide a Correct Email Or Password " });
    }
  } catch (error) {
    res.status(400).json("error", error);
  }
};
const verifyEmail = async (req, res) => {
  console.log(req.params);
  const token = await Token.findOne({ token: req.params.id });
  if (!token) {
    return res.status(400).json({ message: "invalid Link" });
  } else {
    try {
      await UserModel.findOneAndUpdate(
        { _id: token.userId },
        { $set: { isVerified: true } }
      );
      res.status(200).json({ message: "User is registered successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      return res
        .status(500)
        .json({ message: "An error occurred while updating user" });
    } finally {
      // Delete the token regardless of success or failure
      try {
        await Token.findByIdAndDelete(token._id);
      } catch (deleteError) {
        console.error("Error deleting token:", deleteError);
      }
    }
  }
};

//google auth using by passport js

// const googleOuthLogin = async (req, res) => {
//   const User = req.body.email;
//   try {
//     const user = await UserModel.create({
//       fullname: req.body.name,
//       email: req.body.name,
//     });
//     await user.save();
//     res.status(200).json({ message: error.message });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
const googleOuth = async (req, res) => {
  console.log(req.body);
  try {
    let user = await UserModel.findOne({ sub: req.body.sub });
    console.log("hello");
    if (!user) {
      const newUser = {
        fullname: req.body.name,
        email: req.body.email,
        sub: req.body.sub,
        isVerified: true,
      };
      await new UserModel(newUser).save();
      console.log(newUser);
    }

    console.log(user);
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error occurred", error });
  }
};

module.exports = {
  RegisterAuthencation,
  LoginAuthencation,

  verifyEmail,
  googleOuth,
};
