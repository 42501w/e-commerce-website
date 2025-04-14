"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiUser, FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import CartIcon from "./ui/CartIcon";
import { ListOrdered, Search } from 'lucide-react'
import SearchBar from "./ui/SearchBar";
import { useAuthStore } from '@/store'
import OrdersIcon from './OrdersIcon'

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // To toggle the search bar
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const logoutTheUser = async () => {
    try {
      await axios("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Failed to log out", error.message);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${searchQuery}`);
    }
  };

  const headerBgColor = pathname === "/"? "bg-[#FBEBB5]" : "bg-White";

  const menuList = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/shop" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    
  ];

  return (
    <>
      {/* Main Header (Visible on larger screens) */}
      <div className={`hidden md:flex sticky top-0 z-50 justify-between items-center h-[100px] px-4 md:px-20 bg-white ${headerBgColor}`}>
        <div className="flex items-center justify-between w-full md:justify-center md:gap-20 text-lg flex-1 text-gray-700">
          <div className="hidden md:flex gap-14 font-semibold">
            {menuList?.map((item, index) => (
              <Link
                href={item.link}
                key={index}
                className={`hover:text-black hoverEffect relative group ${pathname === item?.link && "text-black"}`}
              >
                <button>{item?.name}</button>
                <span
                  className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname === item?.link && "w-1/2"}`}
                />
                <span
                  className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname === item?.link && "w-1/2"}`}
                />
              </Link>
            ))}
          </div>

          <div className="flex gap-4 md:gap-12 items-center">
            
        <SearchBar/>

            <Link href="/login">
              <button>
                <FiUser size={20} />
              </button>
            </Link>
            <Link href={'/orders'} className="group relative">
              <span className="absolute -top-2 -right-2 bg-black text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
                0
              </span>
              <ListOrdered size={20} className='group-hover:text-black hoverEffect'/> 
            </Link>
            <Link href="/Cart">
              <CartIcon />
            </Link>
          </div>
        </div>

        <button
          className="uppercase bg-white text-black rounded-full px-6 py-2 hover:bg-red-500 hover:text-white cursor-pointer text-md font-medium"
          onClick={logoutTheUser}
        >
          Logout
        </button>
      </div>

     
      <div className={`md:hidden sticky top-0 z-50 bg-[#FBEBB5] p-4 ${headerBgColor}`}>
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <FiSearch size={18} />
            </button>
            <Link href="/login">
              <button>
                <FiUser size={20} />
              </button>
            </Link>
            <Link href={'/orders'} className="group relative">
              <span className="absolute -top-2 -right-2 bg-black text-white h-4 w-4 rounded-full text-xs font-semibold flex items-center justify-center">
                0
              </span>
              <ListOrdered size={20} className='group-hover:text-black hoverEffect'/> 
            </Link>
            <Link href="/Cart">
              <CartIcon />
            </Link>
          </div>
          <button
            className="uppercase bg-white text-black rounded-full px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer text-sm font-medium"
            onClick={logoutTheUser}
          >
            Logout
          </button>
        </div>

       
        {isSearchOpen && (
          <div className="mt-4">
            <input
              type="text"
              className="border rounded-md p-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
        )}

        
        <div className="mt-4 flex flex-col gap-2">
          {menuList?.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className={`hover:text-black hoverEffect relative group ${pathname === item?.link && "text-black"}`}
            >
              <button>{item?.name}</button>
              <span
                className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:left-0 ${pathname === item?.link && "w-1/2"}`}
              />
              <span
                className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 bg-black hoverEffect group-hover:w-1/2 group-hover:right-0 ${pathname === item?.link && "w-1/2"}`}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export const productType = [
  { title: "Sofas", value: "sofas" },
  { title: "Chairs", value: "chairs" },
  { title: "Tables", value: "tables" },
  { title: "Mirrors", value: "mirrors" },
  { title: "Beds", value: "beds" },
];