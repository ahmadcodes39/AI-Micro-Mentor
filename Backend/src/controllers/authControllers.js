import User from "../models/userModal.js";
import {
  comparePassword,
  generateAuthToken,
  hashPassword,
} from "../utils/authFunctions.js";
import "dotenv/config";

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password,goals } = req.body;

  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ message: "This email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    const userAvatar = `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}`;
    const user = await User.create({
      firstname,
      lastname,
      email,
      learningGoal:goals,
      avatar: userAvatar,
      password: hashedPassword,
    });

    const token = generateAuthToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return res.status(201).json({
      message: "User registered successfully",
      user: userObj,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages[0] });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email }).select("+password");
  if (!findUser)
    return res.status(400).json({ message: "Invalid email or password" });

  const isMatch = await comparePassword(password, findUser.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid email or password" });

  const token = generateAuthToken(findUser);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  const userObj = findUser.toObject();
  delete userObj.password;
  return res
    .status(200)
    .json({ message: "User logged in successfully", userObj });
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return res.status(200).json({ message: "Logged out" });
};
 