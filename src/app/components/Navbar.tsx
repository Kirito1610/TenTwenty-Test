import Link from "next/link";
import React from "react";
import { NavbarLinks } from "../Constant";

function Navbar() {
  return (
    <div className="w-full z-50 fixed top-0 sm:top-3">
      <div className="mx-auto w-full sm:w-[95%] flex justify-between items-center p-4 sm:rounded-sm bg-white shadow-md">
        <ul className="max-sm:hidden">
          {NavbarLinks.map((link) => (
            <li
              key={link.name}
              className="inline-block px-4 hover:text-blue-500"
            >
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <Link
          href="#"
          className=" border flex gap-2 items-center justify-center py-2  bg-[#221f2005] px-4 "
        >
          Contact us{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="12"
            viewBox="0 0 18 16"
            fill="none"
          >
            <path
              d="M19 8L1 8M19 8L12.25 15M19 8L12.25 1"
              stroke="#221F20"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <div className="sm:hidden">
          <label
            htmlFor="terms"
            className="flex group items-center p-4 bg-[#F9F4EE] flex-col gap-1"
          >
            <input
              type="checkbox"
              name="terms"
              id="terms"
              className="hidden peer"
            />
            <div className="h-screen peer-checked:left-0 backdrop-blur-[4px] w-screen absolute top-0 left-full bg-[rgba(0,0,0,0.3)] -z-20"></div>
            <div className="h-screen peer-checked:left-3/5 transition-all duration-700 w-screen absolute top-0 left-full bg-white -z-10">
              <ul className="w-full h-full pt-24 flex flex-col justify-start items-end gap-4">
                {NavbarLinks.map((link) => (
                  <li
                    key={link.name}
                    className="inline-block underline w-full text-left px-4 hover:text-blue-500"
                  >
                    <Link href={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-5 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
