"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";
import imagfirst from "../../../public/boat.jpg";
import imagsecond from "../../../public/family.png";
import imageThird from "../../../public/greenfarm.png";
import imageFourth from "../../../public/farm.jpg";
import CustomCursor from "./Cursor";
import "../styles/animate.css";

gsap.registerPlugin(Draggable, MotionPathPlugin);

export default function CircularDragBoxes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Replace useRef with useState
  const ImagesLists = [
    imagfirst,
    imagsecond,
    imageThird,
    imageFourth,
    imagfirst,
    imagsecond,
    imageThird,
    imageFourth,
  ];
  const TextArray = [
    {
      title: "Fresh Produce",
      description:
        "Experience the taste of freshness with our handpicked fruits and vegetables, delivered straight from our farms to your table.",
    },
    {
      title: "Sustainable Farming",
      description:
        "We are committed to sustainable farming practices that protect the environment and promote biodiversity.",
    },
    {
      title: "Community Support",
      description:
        "By choosing our products, you support local farmers and contribute to the growth of our community.",
    },
  ];

  useLayoutEffect(() => {
    const boxes = gsap.utils.toArray<HTMLElement>(".box");
    const step = 360 / boxes.length;

    // Position boxes on circular path
    gsap.set(boxes, {
      motionPath: {
        path: "#myPath",
        align: "#myPath",
        alignOrigin: [0.5, 0.5],
        start: -0.25,
        end: (i: number) => i / boxes.length - 0.25,
        autoRotate: true,
      },
    });

    // Draggable rotation with infinite index
    Draggable.create(containerRef.current, {
      type: "rotation",
      inertia: false,
      onDragEnd: function () {
        // Direction → update index
        setCurrentIndex((prevIndex) => {
          if (this.deltaX > 0 || this.deltaY > 0) {
            return prevIndex + 1;
          } else {
            return prevIndex - 1;
          }
        });

        gsap.to(containerRef.current, {
          rotation: currentIndex * step,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });
  }, [currentIndex]); // Add currentIndex to dependency array to update animation

  return (
    <div className="w-full relative overflow-hidden h-[250px] sm:h-[580px] pt-[100px] sm:pt-[200px] flex items-start justify-center">
      <div className="absolute z-30 h-[100px] sm:h-[200px] bottom-8 sm:bottom-0 w-full">
        <div className="relative w-full h-full flex items-center justify-center">
          {TextArray.map(
            (text, i) =>
              -currentIndex % TextArray.length === i && (
                <div
                  key={i}
                  className={`text-center absolute transition-all duration-500`}
                >
                  <h2 className=" text-xl sm:text-2xl start-animation animate-title text-black font-semibold">
                    {text.title}
                  </h2>
                  <p className="text-gray-600 max-sm:text-sm start-animation animate-paragraph w-11/12 sm:w-2/5 mx-auto mt-2">
                    {text.description}
                  </p>
                </div>
              ),
          )}
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative mx-auto w-[90vw] h-[90vw] container"
      >
        <svg viewBox="0 0 400 400" className="absolute inset-0">
          <path
            id="myPath"
            d="M396,200 C396,308.24781 308.24781,396 200,396 91.75219,396 4,308.24781 4,200 4,91.75219 91.75219,4 200,4 308.24781,4 396,91.75219 396,200 z"
            fill="none"
            stroke="none"
            strokeWidth="2"
          />
        </svg>

        {ImagesLists.map((img, i) => (
          <div
            key={i}
            className="box absolute w-[80px] h-[150px] sm:w-[250px] sm:h-[350px] flex items-center justify-center font-bold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-400 to-blue-600"
          >
            <Image
              src={img.src}
              alt={img.src}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <CustomCursor container={containerRef} />
    </div>
  );
}
