import cloudinary from "../../db/cloudinary.js";
import redis from "../../db/redis.js";
import Product from "../models/product.model.js";
import { uploadToCloudinary } from "../services/cloudinaryUpload.js";

export const crateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    let imageUrl = "";

    if (req.file) {
      const cloudRes = await uploadToCloudinary(req.file.buffer);
      imageUrl = cloudRes.secure_url;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Image upload failed or missing" });
    }
    const product = await Product.create({
      name,
      description,
      price,
      image: imageUrl,
      category,
    });

    res.status(201).json({ product });
  } catch (error) {
    console.log("crate product error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({ products });
  } catch (error) {
    console.log("product get all error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");

    if (featuredProducts) {
      return res.status(200).json({ products: JSON.parse(featuredProducts) });
    }

    featuredProducts = await Product.find({ isFeatured: true }).lean();
    if (!featuredProducts) {
      return res.status(404).json({ message: "No featured products found" });
    }

    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.status(200).json({ featuredProducts });
  } catch (error) {
    console.log("product get all error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          image: 1,
          category: 1,
        },
      },
    ]);

    res.status(200).json({ products });
  } catch (error) {
    console.log("product get all error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    console.log("product get all error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleFeatured = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();
      await updateFeaturedProductsCache();
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("toggle featured error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("deleted image from cloudinary");
      } catch (error) {
        console.log("error deleting image from cloudinary", error);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log("delete product error", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featured_products", JSON.stringify(featuredProducts));
  } catch (error) {
    console.log("update featured products cache error", error);
  }
}
