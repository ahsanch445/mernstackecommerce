const { findOne, findById } = require("../Models/Category-Model");
const UserModel = require("../Models/User-Model");
const getUserProfile = async (req, res) => {
  console.log("hello mr");
  console.log(req.id);
  try {
    const user = await UserModel.findById(req.id, "-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllUser = async (req, res) => {
  try {
    const allUser = await UserModel.find();
    console.log(allUser); // Ensure this doesn't cause issues
    res.json(allUser); // Only sending one response
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const userUpdate = async (req, res) => {
  const user = await UserModel.findById(req.body.userId);
  if (user.roll !== req.body.role) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.body.userId,
        { roll: req.body.role },
        { new: true }
      );
      res.json({ message: "User Upadted Successfully", updatedUser });
      console.log(updatedUser);
    } catch (error) {
      res.status(404).json(error);
    }
  } else {
    res.json("Please Change the role");
  }
};
module.exports = { getUserProfile, userUpdate, getAllUser };
