import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.preprocess((val) => Number(val), z.number().positive("Price must be positive")),
  category: z.string().min(1, "Category is required"),
  productImage: z
    .instanceof(File, { message: "Image is required" })
    .refine((file) => file.size > 0, { message: "Image cannot be empty" }),
});
