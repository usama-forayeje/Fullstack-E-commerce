import express from "express";
import {
  crateProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getRecommendedProducts,
  toggleFeatured,
} from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommended", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, upload.single("productImage"), crateProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeatured);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
