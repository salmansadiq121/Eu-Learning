"use client";
import ThemeSwitcher from "@/app/utils/ThemeSwitcher";
import React, { FC, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  open?: boolean;
  setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-1 z-[999] right-0">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl container text-black dark:text-white" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] text-white flex items-center justify-center ">
          3
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[60vh]  overflow-y-scroll  pb-6 shadow-xl dark:bg-[#111C43] bg-gray-100 absolute z-10 top-16 rounded">
          <h5 className="text-[20px] font-medium text-black dark:text-white p-3 font-Poppins">
            Notifications
          </h5>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#fff]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Questions Received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="p-2 text-gray-700 dark:text-white text-[14px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
              veniam mollitia doloribus obcaecati velit.
            </p>
            <p className="p-2 text-black dark:text-white text-[14px] ">
              12 days ago
            </p>
          </div>
          <div className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#fff]">
            <div className="w-full flex items-center justify-between p-2">
              <p className="text-black dark:text-white">
                New Questions Received
              </p>
              <p className="text-black dark:text-white cursor-pointer">
                Mark as read
              </p>
            </div>
            <p className="p-2 text-gray-700 dark:text-white text-[14px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
              veniam mollitia doloribus obcaecati velit.
            </p>
            <p className="p-2 text-black dark:text-white text-[14px] ">
              12 days ago
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
