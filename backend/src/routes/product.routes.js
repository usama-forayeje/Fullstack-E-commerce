import express from "express";
import { getAllProducts } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, adminRoute, getAllProducts);

export default router;
