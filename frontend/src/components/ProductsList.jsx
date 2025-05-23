// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductStore } from "../store/useProductStore";
import { Button } from "./ui/button";
import { Star, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

function ProductsList() {
  const { deleteProduct, toggleFeatured, products } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <motion.div
      className="bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Table>
        <TableCaption className="text-gray-400 py-2">
          Showing {products?.length || 0} {products?.length === 1 ? "product" : "products"} in
          category view.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Product</TableHead>
            <TableHead className="text-gray-300">Price</TableHead>
            <TableHead className="text-gray-300">Category</TableHead>
            <TableHead className="text-gray-300">Featured</TableHead>
            <TableHead className="text-gray-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product?._id}>
              <TableCell>
                <div className="flex cursor-pointer items-center space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded shadow-md ring-1 ring-gray-700"
                  />
                  <span className="text-gray-200 font-semibold">{product.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-green-400 font-medium">${product.price}</TableCell>
              <TableCell className="text-blue-300">{product.category}</TableCell>
              <TableCell>
                <Button
                  onClick={() => toggleFeatured(product._id)}
                  className={`p-1 rounded-full ${
                    product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-white"
                  } hover:bg-yellow-500 transition cursor-pointer duration-300`}
                  variant="ghost"
                >
                  <Star className="w-5 h-5" />
                </Button>
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="hover:bg-red-500/20 cursor-pointer p-2 rounded-full transition"
                      variant="ghost"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this product?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-gray-400">
                        This action cannot be undone. This will permanently delete{" "}
                        <span className="font-semibold text-white">{selectedProduct?.name}</span>{" "}
                        from your store and database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (selectedProduct?._id) {
                            deleteProduct(selectedProduct._id);
                          }
                        }}
                      >
                        Yes, Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}

export default ProductsList;
