import Image from "next/image";
import React, { FC, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logoutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logoutHandler,
}) => {
  useEffect(() => {
    console.log("User:", user);
  }, [user]);
  return (
    <div className="w-full  ">
      <div
        className={` w-full flex items-center py-4 px-2 cursor-pointer bg-gray-100 ${
          active === 1 ? "dark:bg-slate-800 bg-gray-100" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <div className="relative w-[2rem] h-[2rem] overflow-hidden border-[2px] border-[#37a39a] rounded-full">
          <Image
            src={
              user?.avatar || avatar ? user?.avatar?.url || avatar : "/2.png"
            }
            alt="ProfileImg"
            fill
            className=" w-full h-full "
          />
        </div>
        <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins font-medium text-lg">
          My Account
        </h5>
      </div>
      {/*  */}
      <div
        className={` w-full flex items-center py-4 px-3 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800 bg-gray-100 " : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size="20" className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins font-medium text-lg">
          Change Password
        </h5>
      </div>
      {/*  */}
      <div
        className={` w-full flex items-center py-4 px-3 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800 bg-gray-100 " : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size="20" className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins font-medium text-lg">
          Enrolled Courses
        </h5>
      </div>
      {/*  */}
      {user.role === "admin" && (
        <Link
          href="/admin"
          className={` w-full flex items-center py-4 px-3 cursor-pointer ${
            active === 5 ? "dark:bg-slate-800 bg-gray-100 " : "bg-transparent"
          }`}
          onClick={() => setActive(5)}
        >
          <MdOutlineAdminPanelSettings
            size="22"
            className="dark:text-white text-black"
          />
          <h5 className="pl-2 800px:block hidden dark:text-white text-black font-Poppins font-medium text-lg">
            Admin Dashboard
          </h5>
        </Link>
      )}

      {/*  */}
      <div
        className={` w-full flex items-center py-4 px-3 cursor-pointer dark:text-white hover:text-red-500 text-black  transition duration-200   ${
          active === 4 ? "dark:bg-slate-800 bg-gray-100 " : "bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size="20" className=" " />
        <h5 className="pl-2 800px:block hidden  font-Poppins font-medium text-lg">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
