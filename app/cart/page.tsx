"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/cart/Loading";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import useCartStore from "@/store";
import EmptyCart from "@/components/ui/EmptyCart";
import { Heart, ShoppingBag, Trash } from "lucide-react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";
import PriceFormatter from "@/components/ui/PriceFormatter";
import QuantityButtons from "@/components/ui/QuantityButtons";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/separator";
import paypalLogo from "@/public/paypalLogo.png";
import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";

const CartPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [loading, setLoading] =useState(false)
  const [user, setUser] = useState<{ fullname?: string } | null>(null);
  const {
    deleteCartProduct,
    getTotalPrice,
    getItemCount,
    getSubtotalPrice,
    resetCart,
    getGroupedItems,
  } = useCartStore();

  const cartProducts = getGroupedItems();

  const handleAddToFavorite = (id: string) => {};
  

  const handleResetCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset your cart?"
    );
    if (confirmed) {
      resetCart();
      toast.success("Your Cart reset successfully!");
    }
  };

  const handleDeleteProduct = (id: string) => {
    deleteCartProduct(id);
    toast.success("Product deleted successfully!");
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = Cookies.get("token");

        if (!token) {
          console.log("No token found, redirecting to login");
          router.push("/login");
          return;
        }

        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (!decodedToken.exp) {
          console.log("Invalid token format, redirecting to login");
          Cookies.remove("token");
          router.push("/login");
          return;
        }

        if (decodedToken.exp < currentTime) {
          console.log("Token expired, redirecting to login");
          Cookies.remove("token");
          router.push("/login");
          return;
        }

        console.log("Token is valid");
        setIsLoading(false);
      } catch (error) {
        console.error("Error during token verification:", error);
        Cookies.remove("token");
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

  if (isLoading) {
    return <Loading />;
  }

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token");
      if (!token) {
        toast.error("No user token found. Please login.");
        router.push("/login");
        return;
      }
  
      const decodedToken: any = jwtDecode(token);
      
      // Make sure we have a valid customer name
      if (!decodedToken.fullname) {
        toast.error("User profile incomplete. Please update your profile.");
        return;
      }

      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: decodedToken.fullname,
        customerEmail: decodedToken.email || "unknown",
        userId: decodedToken.userId
      };
  
      console.log("Checkout metadata:", metadata); // Add this for debugging
      
      const checkoutUrl = await createCheckoutSession(cartProducts, metadata);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      toast.error("Something went wrong during checkout.");
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="bg-gray-50 pb-52 md:pb-10 overflow-x-hidden">
      <div className="px-4 md:px-8 lg:px-16">
        {cartProducts?.length ? (
          <>
            <div className="flex items-center gap-2 py-5">
              <ShoppingBag />
              <h1 className="text-xl font-bold">Shopping Cart</h1>
            </div>
            <div className="grid lg:grid-cols-3 md:gap-8">
              <div className="lg:col-span-2 rounded-lg">
                <div className="border bg-white rounded-md">
                  {cartProducts?.map(({ product }) => {
                    const itemCount = getItemCount(product?._id);
                    return (
                      <div
                        key={product?._id}
                        className="border-b p-2.5 last:border-b-0 flex flex-col md:flex-row items-center justify-between gap-5"
                      >
                        <div className="flex w-full md:w-auto items-center gap-2 h-auto md:h-44">
                          {product?.images && (
                            <Link
                              href={`/product/${product?.slug?.current}`}
                              className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group"
                            >
                              <Image
                                src={urlFor(product?.images[0]).url()}
                                alt="productImage"
                                width={500}
                                height={500}
                                loading="lazy"
                                className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-105 overflow-hidden hoverEffect"
                              />
                            </Link>
                          )}
                          <div className="h-full flex flex-1 items-start justify-between flex-col py-1">
                            <div className="space-y-1.5">
                              <h2 className="font-semibold line-clamp-1">
                                {product?.name}
                              </h2>
                              <p className="text-sm text-zinc-600 font-medium">
                                {product?.intro}
                              </p>
                              <p className="text-sm capitalize">
                                Variant:{" "}
                                <span className="font-semibold">
                                  {product?.variant}
                                </span>
                              </p>
                              <p className="text-sm capitalize">
                                Status:{" "}
                                <span className="font-semibold">
                                  {product?.status}
                                </span>
                              </p>
                            </div>
                            <div className="text-gray-500 flex items-center gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Heart className="w-4 h-4 md:w-5 md:h-5 hover:text-green-600 hoverEffect" />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-black text-white">
                                    Add to Favorite
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Trash
                                      onClick={() =>
                                        handleDeleteProduct(product?._id)
                                      }
                                      className="w-4 h-4 md:w-5 md:h-5 hover:text-red-600 hoverEffect"
                                    />
                                  </TooltipTrigger>
                                  <TooltipContent className="font-bold bg-red-600 text-white">
                                    Delete product
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                          <div className="flex flex-col items-start justify-between h-full md:h-44 p-0.5 md:p-1">
                            <PriceFormatter
                              amount={(product?.price as number) * itemCount}
                              className="font-bold text-lg"
                            />
                            <QuantityButtons product={product} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <Button
                    onClick={handleResetCart}
                    className="m-5 font-semibold"
                    variant="destructive"
                  >
                    Reset Cart
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                  <h2 className="text-xl font-semibold mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <PriceFormatter amount={getSubtotalPrice()} />
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <PriceFormatter
                        amount={getSubtotalPrice() - getTotalPrice()}
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold text-black"
                      />
                    </div>
                    <Button
                    onClick={handleCheckout}
                      className="w-full rounded-full font-semibold tracking-wide"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>
                    <Link
                      href={"/"}
                      className="flex items-center justify-center py-2 border border-black/50 rounded-full hover:border-black hover:bg-black/50 hoverEffect"
                    >
                      <Image
                        src={paypalLogo}
                        alt="paypalLogo"
                        className="w-20"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2 z-50">
                <div className="p-4 rounded-t-lg border mx-4">
                  <h2 className="text-xl font-semibold mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <PriceFormatter amount={getSubtotalPrice()} />
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <PriceFormatter
                        amount={getSubtotalPrice() - getTotalPrice()}
                      />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span>Total</span>
                      <PriceFormatter
                        amount={getTotalPrice()}
                        className="text-lg font-bold text-black"
                      />
                    </div>
                    <Button
                    onClick={handleCheckout}
                      className="w-full rounded-full font-semibold tracking-wide"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>
                    <Link
                      href={"/"}
                      className="flex items-center justify-center py-2 border border-black/50 rounded-full hover:border-black hover:bg-black/50 hoverEffect"
                    >
                      <Image
                        src={paypalLogo}
                        alt="paypalLogo"
                        className="w-20"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default CartPage;