import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex gap-2">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={item.url} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[#dc1467] rounded-md dark:bg-gray-300/10 bg-zinc-300/10 shadow-md hover:shadow-xl transition duration-100 active:shadow-md "
                    : "dark:text-white text-black "
                } text-[18px] px-4 font-Poppins font-[500] py-2`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>

      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-4">
            <Link href="/" passHref>
              <span
                className="text-[25px] dark:text-white text-black font-semibold font-Poppins"
                style={{ textShadow: "-1px 1px 0px #999" }}
              >
                EU
                <span className="text-green-600 dark:text-sky-500">
                  Learning
                </span>
              </span>
            </Link>
          </div>
          <div className="w-full text-center py-6 ">
            {navItemsData &&
              navItemsData.map((item, index) => (
                <Link href={item.url} key={index} passHref className="mt-2">
                  <span
                    className={`${
                      activeItem === index
                        ? "dark:text-[#37a39a] text-[#dc1467] rounded-md dark:bg-gray-100/10 bg-zinc-300/10 shadow-md hover:shadow-xl transition duration-100 active:shadow-md "
                        : "dark:text-white text-black"
                    } block py-2 text-[18px] px-6 font-Poppins font-[500] mx-2`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;
