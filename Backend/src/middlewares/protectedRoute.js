import jwt from "jsonwebtoken";
import User from "../models/userModal.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    // console.log("user from backend",req.user)
    next();
  } catch (err) {
    console.error("Auth Error:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
