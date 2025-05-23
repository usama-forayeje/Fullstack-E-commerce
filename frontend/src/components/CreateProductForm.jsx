/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createProductSchema } from "../validation/createProduct.schema";
import InputWithIcon from "./form/InputWithIcon";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import FileUpload from "./ui/fileUpload";
import { SelectScrollable } from "./ui/selectScrollable";
import SubmitButton from "./form/SubmitButton";
import { useProductStore } from "../store/useProductStore";
import { PlusCircleIcon } from "lucide-react";

const categories = [
  {
    label: "All Categories",
    options: [
      { label: "T-shirt", value: "tshirt" },
      { label: "Shoe", value: "shoe" },
      { label: "Pants", value: "pants" },
      { label: "Dress", value: "dress" },
      { label: "Jacket", value: "jacket" },
      { label: "Watch", value: "watch" },
      { label: "Bag", value: "bag" },
      { label: "Accessories", value: "accessories" },
    ],
  },
];

function CreateProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(createProductSchema),
  });

  const { createProducts } = useProductStore();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("productImage", data.productImage);
      console.log(data);
      await createProducts(formData);
      reset();
    } catch (error) {
      console.log("log in error", error);
    }
  };

  return (
    <div className="flex flex-col justify-center py-2 sm:px-6 lg:px-8">
      <motion.div
        className=" sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-4 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="my-6 text-center text-3xl font-extrabold text-emerald-400">
            Create New Product
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <InputWithIcon
                id="name"
                label="Product Name"
                placeholder="Inter your product name"
                register={register}
                error={errors.name}
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm  text-gray-300">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter your product description"
                {...register("description")}
                className="..."
              />
            </div>
            <div>
              <InputWithIcon
                id="price"
                label="Price"
                type="number"
                placeholder="Inter your product price"
                register={register}
                error={errors.price}
              />
            </div>
            <div>
              <SelectScrollable
                id="category"
                label="Category"
                placeholder="Select a category"
                groups={categories}
                value={watch("category") ?? ""}
                onChange={(value) => setValue("category", value)}
                className="w-full"
                error={errors.category}
              />
            </div>

            <div>
              <FileUpload
                id="productImage"
                label="Product Image"
                accept="image/*"
                onChange={(e) => setValue("productImage", e.target.files[0])}
                error={errors.productImage}
              />
            </div>
            <SubmitButton isLoading={isSubmitting}>
              <PlusCircleIcon className="mr-2" size={18} />
              Create Product
            </SubmitButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateProductForm;
