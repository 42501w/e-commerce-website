"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import React from "react";
import QuantityButtons from "./QuantityButtons";
import PriceFormatter from "./PriceFormatter";
import useCartStore from "@/store";
import { toast } from "react-hot-toast";

interface Props {
  product: Product;
  className?: string;
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = !product?.stock || product?.stock === 0;
  
  
  return (
    <div className="w-full h-12 flex items-center">
      {itemCount ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.name?.substring(0, 12)}... added successfully!`
            );
          }}
          disabled={isOutOfStock}
          className={cn(
            "bg-transparent text-black shadow-none border border-black/30 px-4 py-3 rounded-lg hover:text-white font-semibold w-full tracking-wide hoverEffect hover:bg-black",
            className,
            isOutOfStock ? "cursor-not-allowed opacity-80" : "hover:bg-black"
          )}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      )}
    </div>
  );
};

export default AddToCartButton;
