import { style } from "@/app/styles/style";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const Footer = (props: Props) => {
  const [email, setEmail] = useState("");
  const handleNewsLetter = async (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="mt-8 w-full text-black dark:text-white py-6 border-t-2 border-gray-200 dark:border-gray-600  pb-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-[1rem] md:gap-2 px-3 sm:px-6">
        <div className="flex flex-col gap-3">
          <h3 className="text-[18px] font-semibold text-black dark:text-white">
            About
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600 transition-all duration-150 cursor-pointer "
            >
              Our Stories
            </Link>
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600  transition-all duration-150 cursor-pointer "
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600  transition-all duration-150 cursor-pointer "
            >
              FAQ&rsquo;s
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[18px] font-semibold text-black dark:text-white">
            Quick Links
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600 transition-all duration-150 cursor-pointer "
            >
              Courses
            </Link>
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600 transition-all duration-150 cursor-pointer "
            >
              My Account
            </Link>
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600 transition-all duration-150 cursor-pointer "
            >
              Course Dashboard
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[18px] font-semibold text-black dark:text-white">
            Social Links
          </h3>
          <div className="flex flex-col gap-3">
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600 transition-all duration-150 cursor-pointer "
            >
              Youtube
            </Link>
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600 transition-all duration-150 cursor-pointer "
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="hover:text-[#094a64] dark:text-gray-200 text-gray-600 transition-all duration-150 cursor-pointer "
            >
              Github
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-[18px] font-semibold text-black dark:text-white">
            Newsletter
          </h3>
          <div className="flex flex-col gap-3">
            <p className=" text-[14px] text-gray-600 dark:text-gray-200">
              Stay up-to-date with everything related to our brand and gain
              invaluable insights for your programming journey by subscribing to
              our newsletter.
            </p>
            <form onSubmit={handleNewsLetter}>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e: any) => setEmail(e.target.value)}
                className={`${style.input}`}
              />
              <div className="flex items-center justify-end">
                <button className={`${style.button} w-[6.6rem] mt-5`}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="mt-6 sm:mt-4 flex items-center justify-center w-full pb-6">
        <h3 className="font-medium text-center">
          Copyright &copy; 2024{" "}
          <span className="text-gradient">EULearning</span> | All Rights
          Reserved
        </h3>
      </div>
    </div>
  );
};

export default Footer;
