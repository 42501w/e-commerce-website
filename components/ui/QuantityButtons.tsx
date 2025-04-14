import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useCartStore from "@/store";
import React from "react";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {
  const { addItem, getItemCount, removeItem } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = !product?.stock || product?.stock === 0;
  const handleRemoveProduct = () => {
    removeItem(product?._id);
    if (itemCount > 1) {
      toast.success("Quantity Decreased Successfully!");
    } else {
      toast.success(`${product?.name?.substring(0, 12)} removed successfully!`);
    }
  };
  return (
    <div className={cn("flex items-center space-x-2 pb-1", className)}>
      <button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        className="border text-gray-800 p-1 hover:bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          ></path>
        </svg>
      </button>

      <span className="text-sm text-center font-semibold text-black">
        {itemCount}
      </span>

      <button
        onClick={() => {
          addItem(product);
          toast.success(
            `${product?.name?.substring(0, 12)}... added successfully!`
          );
        }}
        className="border text-gray-800 p-1 hover:bg-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default QuantityButtons;
