"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
// import { ShinyButton } from "../magicui/shiny-button";
// import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { ShimmerButton } from "../magicui/shimmer-button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-[#FFFDF1] shadow-md rounded-b-xl">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <Image src="https://res.cloudinary.com/da3u4ukxz/image/upload/v1739859926/LOGO1_D_ixrlwm.png" alt="K-PREP Logo" width={25} height={25} />
        <span className="text-[#5b7350] text-lg font-extrabold tracking-wide hidden md:block">K - P R E P</span>
      </div>
      
      {/* Button Section */} 
      <div className="flex sm:space-x-4 space-x-2">
      <Link href="/pricing">
<ShimmerButton> Our Plans</ShimmerButton>
        </Link>
        <Link href="/sign-in">
          <Button className="sm:px-4 px-3 sm:py-2 py-1 bg-[#D8F0D1] text-[#325780] rounded-full shadow-sm hover:bg-[#c8e6c9] transition duration-300">
            REGISTER
          </Button>
        </Link>
        <Link href="/sign-in">
          <Button className="sm:px-4  px-3 sm:py-2 py-1 bg-[#325780] text-[#D8F0D1] rounded-full shadow-sm hover:bg-[#28456a] transition duration-300">
            LOGIN
          </Button>
        </Link>
      </div>
    </nav>
  );
}
