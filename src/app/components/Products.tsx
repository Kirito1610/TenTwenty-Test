"use client";
import React, { useEffect, useRef } from "react";
import CircularDragScroll from "./CircularDragScroll";
import "../styles/animate.css";
function Products() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const title = section.querySelector(".animate-title");
    const paragraph = section.querySelector(".animate-paragraph");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (title) title.classList.add("start-animation");
            if (paragraph) paragraph.classList.add("start-animation");
            observer.unobserve(section); // Stop observing after animation triggers
          }
        });
      },
      { threshold: 0.1 }, // Trigger when 10% of the section is visible
    );

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <div className="w-full pt-20 max-sm:pb-32 bg-white" ref={sectionRef}>
      <div className="flex z-10 flex-col gap-2">
        <h2 className=" text-4xl sm:text-6xl tracking-[-1px] m-0 text-center animate-title">
          Quality Products
        </h2>
        <p className="text-center w-4/5 sm:w-1/2 text-[#7A7777] mx-auto mt-4 animate-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <CircularDragScroll />
    </div>
  );
}

export default Products;
