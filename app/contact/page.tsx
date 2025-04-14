import FooterTop from '@/components/ui/FooterTop';
import React from 'react';
import Image from 'next/image';
import { MdKeyboardArrowRight } from 'react-icons/md';

const ContactUs = () => {
  return (
<>
            <div style={{ backgroundImage: "url('/Rectangle 1.png')" }} className="h-[350px] w-full bg-cover bg-center bg-opacity-70">
                <Image src={'/Meubel House_Logos-05.png'} height={77} width={77} alt="logo" className="ml-[645px] pt-14 shadow-md "></Image>
                <h1 className="text-center font-medium text-5xl leading-[50px]">Contact</h1>
                <div className="flex items-center">
                <p className="ml-[630px] mt-3 font-medium text-base">Home</p>
                <p className="pt-4"><MdKeyboardArrowRight  size={25}/></p>
                <p className="font-light text-base pt-[14px]">Contact</p>
                </div>
                </div>
    <section className="bg-white py-12 px-20">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <div className="text-center mb-20">
          <h1 className="text-3xl font-bold text-gray-800">Get In Touch With Us</h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            For More Information About Our Product & Services, Please Feel Free To Drop Us An Email. Our Staff Will Always Be There To Help You Out. Do Not Hesitate!
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-3">
              <div className="text-2xl text-gray-800">&#128205;</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Address</h3>
                <p className="text-gray-600">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-2xl text-gray-800">&#128222;</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                <p className="text-gray-600">Mobile: +(+84) 546-6789</p>
                <p className="text-gray-600">Hotline: +(+84) 456-6789</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="text-2xl text-gray-800">&#128337;</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">Working Time</h3>
                <p className="text-gray-600">Monday-Friday: 9:00 - 22:00</p>
                <p className="text-gray-600">Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 font-medium">Your Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-medium">Email Address</label>
                  <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Subject</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Subject (optional)"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium">Message</label>
                <textarea
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  rows={4}
                  placeholder="Hi! I'd like to ask about..."
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <FooterTop/>
    </>

  );
};

export default ContactUs;
