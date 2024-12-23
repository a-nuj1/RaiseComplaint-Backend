import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];  

    if (!token) {
      return res.status(401).json({ message: "Login to create a complaint!!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};