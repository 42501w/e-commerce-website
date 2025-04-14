"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "./input";
import { client } from "@/sanity/lib/client";
import { Product } from "@/sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)`;
      const params = { search: `*${search}*` };
      const response = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger onClick={() => setShowSearch(!showSearch)}>
        <Search className="w-5 h-5 hover:text-black hoverEffect" />
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-full h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="mb-1">Product Searchbar</DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              placeholder="Search your product here..."
              className="w-full rounded-md py-5 pr-12"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <X
                onClick={() => setSearch("")}
                className="w-4 h-4 absolute top-4 right-12 hover:text-red-600 hoverEffect cursor-pointer"
              />
            )}
            <button
              type="submit"
              className={`absolute right-0 top-0 w-10 h-full flex items-center justify-center 
                rounded-tr-md rounded-md rounded-br-md hover:bg-black hover:text-white hoverEffect
                ${search ? "bg-black text-white" : "bg-black/10"}`}
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>

        {/* Results Section */}
        <div className="flex-1 w-full overflow-y-auto mt-2 border border-black/20 rounded-md">
          <div>
            {loading ? (
              <p className="flex items-center px-6 py-10 gap-1 text-center text-yellow-600 font-semibold">
                <Loader2 className="w-5 h-5 animate-spin" />
                Searching in progress...
              </p>
            ) : products.length ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white overflow-hidden border-b last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center p-2 gap-4">
                    <Link
                      href={`/product/${product.slug?.current}`}
                      className="h-24 w-24 flex-shrink-0 border border-black/20 rounded-md overflow-hidden group mx-auto sm:mx-0"
                      onClick={() => setShowSearch(false)}
                    >
                      {product.images && (
                        <Image
                          width={200}
                          height={200}
                          src={urlFor(product.images[0]).url()}
                          alt="productImage"
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                    </Link>
                    <div className="flex-grow">
                      <Link
                        href={`/product/${product.slug?.current}`}
                        onClick={() => setShowSearch(false)}
                      >
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800 line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-800 line-clamp-1">
                          {product.intro}
                        </p>
                      </Link>
                      <PriceView
                        price={product.price}
                        discount={product.discount}
                        className="md:text-lg"
                      />
                    </div>
                    <div className="w-full sm:w-auto sm:mt-0 mt-2 sm:ml-4">
                      <AddToCartButton product={product} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 font-semibold tracking-wide">
                {search && !loading ? (
                  <p>
                    Nothing matches the keyword{" "}
                    <span className="underline text-red-600">{search}</span>.
                    Please try something else.
                  </p>
                ) : (
                  <p className="text-green-600 flex items-center justify-center gap-1">
                    <Search className="w-5 h-5" /> Search and explore your
                    products
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;
