"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import imagfirst from "../../../public/boat.jpg";
import imagsecond from "../../../public/family.png";
import imageThird from "../../../public/greenfarm.png";
import imageFourth from "../../../public/farm.jpg";
import imageFifth from "../../../public/farmer.png";
import Timer from "./Timer";
function HeroSection() {
  const [currentActiveIndex, setCurrentActiveIndex] = useState(0);
  const ImagesLists = [imagfirst, imagsecond, imageThird, imageFourth,imageFifth];
  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentActiveIndex((prev) => (prev + 1) % ImagesLists.length);
    }, 4000);
    return () => clearTimeout(interval);
  }, [currentActiveIndex,ImagesLists.length]);

  return (
    <div className=" h-screen flex items-center justify-start overflow-hidden relative w-full ">
        <div className=" z-20 w-full pl-4 sm:pl-14 text-white flex flex-col gap-2">
         <p className=" max-sm:text-sm">Welcome To TenTwenty Farms</p>
         <h1  className=" text-4xl sm:text-6xl capitalize whitespace-pre-wrap">{`From our Farms \nto your hands`}</h1>
        </div>
      {ImagesLists.map((imgSrc, index) => (
        <Image
          key={index}
          src={imgSrc.src}
          width={500}
          height={500}
          quality={100}
          alt={`Hero Image ${index + 1}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-[clip-path,scale] duration-[1.5s] ${
            currentActiveIndex === index
              ? "[clip-path:inset(0%_0_0%_0)] delay-0 scale-125 z-10"
              : " scale-100 z-0 delay-[1.75s] [clip-path:inset(50%_0_50%_0)]"
          } ease-in `}
        />
      ))}
      <div className=" z-20 absolute bottom-14 left-4 sm:left-14">
        <Timer onNext={setCurrentActiveIndex} currentActiveIndex={currentActiveIndex} imageSrc={ImagesLists[currentActiveIndex < ImagesLists.length - 1 ? currentActiveIndex  + 1 : 0]?.src} />
      </div>
    </div>
  );
}

export default HeroSection;
