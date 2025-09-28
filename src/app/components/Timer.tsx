import React, { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import Image from "next/image";

function Timer({ imageSrc,currentActiveIndex,onNext}: {onNext:Dispatch<SetStateAction<number>>;currentActiveIndex:number;imageSrc: string }) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) =>{ 
       
        return(prev >= 100 ? 0 : prev + 1)});
    }, 10); // increment every 0.1s
   
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    setActive(0)
    setProgress(0)
  },[currentActiveIndex])
if (progress === 100) {
    setActive((prev) => (prev === 3 ? 0 : prev + 1));
    setProgress(0);
    }
  
  return (
    <div className=" flex  gap-8 relative">
      <div onClick={()=>onNext(currentActiveIndex + 1 > 3 ? 0 : currentActiveIndex + 1)} className="w-20 cursor-pointer border relative border-white p-2 h-20">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Top-right horizontal */}
          <div
            className="absolute -top-0.5 left-[1px] h-1 bg-white origin-left"
            style={{ width: `${active === 0 ? progress : 100}%` }}
          />
          {/* Bottom-left vertical */}
          <div
            className="absolute bottom-[-1px] -left-0.5 w-1 bg-white origin-top"
            style={{ height: `${active === 3 ? progress : 0}%` }}
          />
           <div
            className="absolute -bottom-0.5 right-[-1px] h-1 bg-white origin-top"
            style={{ width: `${active === 2 ? progress : active > 2 ? 100 : 0}%` }}
          />
          <div
            className="absolute -top-[1px] -right-0.5 w-1 bg-white origin-top"
            style={{ height: `${active === 1 ? progress : active > 1 ? 100 :0}%` }}
          />
        </div>
        <p className=" text-white absolute top-1/3 left-[30%]">Next</p>
        <Image
          src={imageSrc}
          alt={imageSrc}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="flex items-center justify-between w-48 mx-auto">
      {/* Left number */}
      <div className="text-white  w-6 overflow-hidden text-lg">
         {Array.from({length:5}).map((_,i)=><p key={i} className={`inline-block h-8 overflow-hidden absolute transition-all duration-700 ${i === currentActiveIndex ? '-translate-y-3.5 opacity-100': 'translate-y-5 opacity-0'}`}>{`0${i + 1}`}</p>)}
      </div>

      {/* Line */}
      <div className="flex-1 h-px bg-white mx-2"></div>

      {/* Right number */}
      <span className="text-white text-lg">05</span>
    </div>
    </div>
  );
}

export default Timer;
