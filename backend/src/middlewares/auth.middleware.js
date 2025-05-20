import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { UserRolesEnum } from "../../constants/roles.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({ message: "User not logged in" });
    }

    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error("Access token error:", error.massage);
      res.status(401).json({ message: "Invalid access token" });
    }
  } catch (error) {
    console.error("Protect route error:", error.massage);
    res.status(500).json({ message: "Internal server error  " });
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    if (req.user && req.user.role === UserRolesEnum.ADMIN) {
      next();
    } else {
      return res.status(403).json({ message: "access denied | - Admin only" });
    }
  } catch (error) {
    console.error("Admin route error:", error.massage);
    res.status(500).json({ message: "Internal server error" });
  }
};
