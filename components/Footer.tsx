import React from "react";
import SocialMedia from "./ui/SocialMedia";
import { Input } from "./ui/input";


const Footer = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        {/* Grid for Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Address Section */}
          <div className="text-center sm:text-left mt-8 space-y-3">
            <p className="font-normal text-gray-600 text-base">
              400 University Drive Suite 200 Coral Gables, <br />
              FL 33134 USA
            </p>
            <SocialMedia
              className="text-black/60"
              iconClassName="border-black/60 hover:border-black hover:text-black"
              tooltipClassName="bg-black text-white"
            />
          </div>

          {/* Links Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-gray-600 font-medium text-base mb-4">Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="/" className="hover:text-gray-900">
                  Home
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-gray-900">
                  Shop
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-gray-600 font-medium text-base mb-4">Help</h3>
            <ul className="space-y-4">
              <li>
                <a href="/payment">Payment Options</a>
              </li>
              <li>
                <a href="/return">Returns</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policies</a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-gray-600 font-medium text-base mb-4">
              Newsletter
            </h3>
            <div className="flex flex-col space-y-4">
              <form className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter Your Email Address"
                  required
                  className="px-4 w-full py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                  type="submit"
                  className="px-24 py-2 w-full bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Divider and Copyright Section */}
        <div className="mt-8 text-center">
          <hr className="border-gray-300 my-6" />
          <p className="font-normal text-base text-gray-600">
            &copy; 2022 Mabel House. All rights reserved
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
