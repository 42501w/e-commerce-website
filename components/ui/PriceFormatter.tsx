import React from "react";
import { cn } from "@/lib/utils"; // assuming you're using a utility like `cn` to merge classes

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  if (amount === undefined) return null;

  const formattedPrice = new Number(amount).toLocaleString("en-PK", {
    currency: "PKR",
    style: "currency",
  });

  return (
   
    <span className={cn(" font-semibold", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;
