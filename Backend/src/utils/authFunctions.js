import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";

export const generateAuthToken = (user) => {
  const payload = {
    id: user?.id,
    email: user?.email,
  };
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: "7d" });
  
  return token;
};

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const comparePassword = async (inputPassword, hashPassword) => {
  return bcrypt.compare(inputPassword, hashPassword);
};
