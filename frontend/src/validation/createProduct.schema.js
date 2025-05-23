import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Invalid image URL"),
});
