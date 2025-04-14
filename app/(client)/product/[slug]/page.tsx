import React from "react";
import { getProductBySlug } from "@/sanity/helpers/queries";
import { notFound } from "next/navigation";
import ImageView from "@/components/ui/ImageView";
import PriceView from "@/components/ui/PriceView";
import AddToCartButton from "@/components/ui/AddToCartButton";
import {
  BoxIcon,
  FileQuestion,
  Heart,
  ListOrderedIcon,
  Share,
} from "lucide-react";
import ProductCharacteristic from "@/components/ui/ProductCharacteristics";

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="py-10 pl-16 flex flex-col md:flex-row gap-10">
      {product?.images && <ImageView images={product?.images} />}
      <div className="w-full md:w-1/2 flex flex-col gap-5">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
            {product?.name}
          </h2>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-lg font-bold text-gray-700"
          />
        </div>
        {product?.stock && (
          <p className="bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg">
            In Stock
          </p>
        )}
        <p className="text-sm text-gray-600 tracking-wide pr-12">
          {product?.description}
        </p>

        <div className="flex items-center gap-4 ">
          <AddToCartButton
            product={product}
            className="bg-black/80 text-white px-4 py-2 rounded-md hover:bg-black transition duration-300"
          />
          <button className="border-2 border-black/30 text-black/60 px-3 py-2 rounded-md hover:text-black hover:border-black transition duration-300 flex items-center justify-center mr-6">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <ProductCharacteristic product={product} />
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2 mr-6">
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <BoxIcon className="w-5 h-5" />
            <p>Compare color</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <FileQuestion className="w-5 h-5" />
            <p>Ask a question</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <ListOrderedIcon className="w-5 h-5" />
            <p>Delivery & Return</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-black hover:text-red-600 hoverEffect">
            <Share className="w-5 h-5" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <div className="border border-blue-300/20 text-center p-3 hover:border-blue-500 rounded-md hoverEffect">
            <p className="text-base font-semibold text-black">Free Shipping</p>
            <p className="text-sm text-gray-500">
              Free shipping over order 12,000
            </p>
          </div>
          <div className="border border-blue-300/20 text-center p-3 hover:border-blue-500 rounded-md hoverEffect">
            <p className="text-base font-semibold text-black">
              Flexible Payment
            </p>
            <p className="text-sm text-gray-500">
              Pay with Multiple Credit Cards
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
