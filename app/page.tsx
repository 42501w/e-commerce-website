'use client';

import Image from "next/image";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import axios from "axios";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ui/ProductGrid";

export default function Home() {

  return (
    <main className="h-auto">
      <section className="bg-[#FBEBB5] grid grid-cols-1 md:grid-cols-2 px-4 md:px-0 py-8 md:py-0">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-5xl xl:text-6xl font-semibold leading-relaxed md:w-[440px] h-auto mt-8 md:mt-52 md:ml-20 xl:ml-64">
            Rocket single seater
          </h1>
          <p className="text-lg md:text-2xl font-semibold mt-6 md:mt-9 md:ml-20 xl:ml-64 underline underline-offset-4 md:underline-offset-[12px]">
            Shop Now
          </p>
        </div>
        <div className="flex justify-center md:justify-end mt-8 md:-mt-8">
          <Image src='/Rocket single seater 1.png' alt="Rocket single seater" height={1000} width={853} className="max-w-full h-auto" />
        </div>
      </section>
    </main>
  );
}
