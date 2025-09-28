import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Products from "./components/Products";
import { Work_Sans } from "next/font/google";
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function HomePage() {
  return (
    <main className={` relative ${workSans.className}`}>
      <Navbar />
      <HeroSection />
      <Products />
    </main>
  );
}
