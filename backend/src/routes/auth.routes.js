import express from "express";
import { logIn, logOut, profile, refreshToken, signUp } from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/log-in", logIn);
router.post("/log-out", logOut);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, profile);

export default router;
