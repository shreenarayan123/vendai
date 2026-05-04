export const dynamic = 'force-dynamic';
"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../app/assets/logo.png";

import { Button } from "@/components/ui/button";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Pricing from "@/components/pricing";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import HowItWorks from "@/components/howitworks";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);


  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex min-h-screen flex-col ">
      <header className="sticky top-0 z-50 w-full border-b ">
        <div
          className={` px-16 flex h-16 items-center w-full justify-between ${
            isScrolled
              ? "backdrop-blur supports-[backdrop-filter]:bg-background/60 "
              : "bg-customblue "
          }`}
        >
          {" "}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image src={Logo} alt="Logo" width={27} height={27} />{" "}
            </div>{" "}
            <span className="text-xl font-bold">Vend AI</span>
          </div>
          <span className="hidden gap-10 justify-between self-stretch my-auto leading-5 max-md:flex-wrap max-md:max-w-full font-normal  md:flex">
               <Link
              href={"#features"}
                className="text cursor-pointer text-500 relative group text-sm font-medium pb-[2px]"
              >
                Features
                <span className="absolute bottom-0 left-0 w-0  rounded-lg h-[2px] bg-black transition-all duration-300 group-hover:w-[110%] "></span>
              </Link>
              <Link
              href={"#howitworks"}
                className="text cursor-pointer text-500 relative group text-sm font-medium pb-[2px]"
              >
                How it works
                <span className="absolute bottom-0 left-0 w-0  rounded-lg h-[2px] bg-black transition-all duration-300 group-hover:w-[110%] "></span>
              </Link>
              <Link
              href={"#pricing"}
                className="text cursor-pointer text-500 relative group text-sm font-medium pb-[2px]"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0  rounded-lg h-[2px] bg-black transition-all duration-300 group-hover:w-[110%] "></span>
              </Link>            
          </span>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button size="sm">Log in</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-customblue">
        <Hero />
        <Features />
        <Pricing />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
