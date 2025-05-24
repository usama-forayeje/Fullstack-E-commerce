import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 shadow-md transition hover:shadow-lg">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Image */}
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-700">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-1 text-gray-200">
          <h3 className="text-base font-semibold text-emerald-400">{item.name}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
          <p className="text-sm font-bold text-emerald-300">${item.price}</p>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center gap-2 md:ml-auto">
          <Button
            size="icon"
            className="h-6 w-6 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
          >
            <Minus className="h-4 w-4 text-gray-300" />
          </Button>
          <span className="w-6 text-center text-sm font-medium text-gray-100">{item.quantity}</span>
          <Button
            size="icon"
            className="h-6 w-6 rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600"
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
          >
            <Plus className="h-4 w-4 text-gray-300" />
          </Button>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item._id)}
          className="text-gray-400 hover:text-red-500 transition"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default CartItem;
