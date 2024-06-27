import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = () => {
  return (
    <div className="w-full 1000px:flex items-center">
      <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50hv] hero-animation rounded-full" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-4">
        {/* Image */}
        <div className="relative max-w-[40rem] min-w-[20rem] max-h-[40rem] min-h-[23rem] ">
          <Image src="/home2.png" alt="Hero" fill className="" />
        </div>
        {/* Content  1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[2.5rem] sm:px-4 px-2  */}
        <div className="w-full py-4 flex items-start flex-col justify-start px-[1rem] ">
          <h2 className="dark:text-white text-black text-[30px] w-full 1000px:text-[55px] font-[700] font-Josefin py-2 1000px:leading-[75px] text-start ">
            Improve Your Skills & Learning Experience Better Instantly
          </h2>

          <br />
          <p className="dark:text-zinc-100 text-zinc-800 font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
            We have 50+ courses & 50K+ online registered students. Find your
            desired Courses from them.
          </p>
          <br />
          <br />
          <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[51px] bg-transparent relative">
            <input
              type="search"
              placeholder="Search Course..."
              className="bg-transparent border dark:border-none dark:bg-zinc-600 dark:placeholder:text-zinc-300 dark:text-white rounded-md p-2 w-full h-full outline-none text-black font-Josefin font-[500] text-[20px]"
            />
            <div className="absolute flex items-center justify-center w-[50px] h-[50px] cursor-pointer rounded-r-md shadow-md hover:shadow-xl active:shadow-md right-0 top-0 bg-blue-500">
              <BiSearch className="text-white" size={30} />
            </div>
          </div>
          <br />
          <br />
          <div className="flex items-center w-full ml-2 ">
            <Image
              src="/per2.jpeg"
              alt="Users"
              width={40}
              height={40}
              className="sm:w-[2.2rem] w-[3rem] sm:h-[2.2rem] h-[2rem] rounded-full overflow-hidden ml-[-10px] border-2 border-zinc-200 "
            />
            <Image
              src="/per3.jpg"
              alt="Users"
              width={40}
              height={40}
              className="sm:w-[2.2rem] w-[3rem] sm:h-[2.2rem] h-[2rem] rounded-full overflow-hidden ml-[-10px] border-2 border-zinc-200 "
            />
            <Image
              src="/per5.jpg"
              alt="Users"
              width={40}
              height={40}
              className="sm:w-[2.2rem] w-[3rem] sm:h-[2.2rem] h-[2rem] rounded-full overflow-hidden ml-[-10px] border-2 border-zinc-200 "
            />
            <p className="dark:text-zinc-100 text-zinc-800 ml-2 1000px:pl-3 font-medium sm:text-[18px] text-[1rem] font-Josefin">
              50k+ People already trusted us.{" "}
              <button className="dark:text-green-500 text-red-600 hover:bg-zinc-200/30 border border-gray-300 dark:hover:bg-zinc-400/40 rounded-md cursor-pointer py-2 px-3 hover:shadow-md transition-all duration-200">
                <Link href="/courses" className="">
                  View Course
                </Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
