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
const RegisterAuthencation = async (req, res) => {
  // Replace with your actual verification link

  const { fullname, username, email, password } = req.body;
  console.log(req.body);
  var isEmail = validator.validate(email);
  const exitsUser = await UserModel.findOne({
    email: email,
  });

  if (exitsUser?.isVerified) {
    res.status(409).json({ message: "Email is Already Exits" });
  } else if (!isEmail) {
    res.status(400).json({ message: "Please Enter a Valid Email" });
  } else if (
    fullname.length <= 6 ||
    username.length <= 6 ||
    password.length <= 6
  ) {
    res.status(400).json({ message: "Minimum 6 Letters are required" });
  } else {
    const bcryptPassword = await hash(password, 10);
    const User = new UserModel({
      fullname: fullname,
      username: username,
      email: email,
      password: bcryptPassword,
    });
    await User.save();
    if (!User.isVerified) {
      try {
        const token = await new Token({
          userId: User._id,
          token: crypto.randomBytes(16).toString("hex"),
        });
        await token.save();
        const verificationLink = `http://localhost:5173/auth/verifiy/${token.token}`;
        await sendVerificationEmail(email, verificationLink);
      } catch (error) {
        res.status(400).json(error.message);
      }
    }
    res
      .status(200)
      .json({ message: "Verification email sent. Please check your email" });
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