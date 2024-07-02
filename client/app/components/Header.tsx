"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModle from "../utils/CustomModle";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  useLogOutMutation,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useSelector } from "react-redux";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, { refetchOnMountOrArgChange: true });
  const { user } = useSelector((state: any) => state.auth);
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

  // Social
  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }

      if (data === null) {
        if (isSuccess) {
          setOpen(false);
          toast.success("Login Successfully!");
        }
      }
      if (error) {
        if ("data" in error) {
          const errorData = error as any;
          toast.error(errorData.data.message);
        }
      }
    }
    // eslint-disable-next-line
  }, [data, user, isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.screenY > 80) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }

  //   Handle Close
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };
  return (
    <div className="w-full relative  ">
      <div
        className={`${
          active
            ? "dark:opacity-50 dark:bg-gradient-to-b  dark:from-gray-900  dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow shadow-md"
        }`}
        // style={{
        //   backgroundImage:
        //     theme === "dark"
        //       ? ""
        //       : "linear-gradient(to right, rgba(0, 169, 247, 0.5), rgba(0, 169, 247, 0.5), rgba(0, 169, 247, 0.5))",
        // }}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full flex items-center justify-center">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            <div className="">
              <Link
                href="/"
                className={`text-[28px] font-Poppins font-[700] text-black dark:text-white transform -skew-y-3`}
                style={{ textShadow: "-1px 1px 0px #999" }}
              >
                EU
                <span className="text-green-600 dark:text-sky-500 transform skew-y-3">
                  Learning
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              {/* Theme */}
              <ThemeSwitcher />

              {/* Only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenuAlt3
                  className=" cursor-pointer dark:text-white text-black"
                  size="25"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              {/* Profile Image */}
              {user ? (
                <>
                  <Link href="/profile">
                    <Image
                      src={
                        user?.avatar ? user?.avatar?.url : "/defaultProfile.png"
                      }
                      alt="Avatar"
                      width={38}
                      height={38}
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "50%",
                        cursor: "pointer",
                        border: activeItem === 5 ? "2px solid #37a39a" : "none",
                      }}
                    />
                  </Link>
                </>
              ) : (
                <HiOutlineUserCircle
                  className=" cursor-pointer hidden 800px:block dark:text-white text-black px-2"
                  size="45"
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>

        {/*Mobile Sidebar  */}
        {openSidebar && (
          <div
            className="fixed top-0 left-0 w-full h-screen z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-95 top-0 right-0">
              {/* Profile Image */}
              <div className="w-full flex items-center justify-center mt-8 ">
                {user ? (
                  <>
                    <Link href="/profile">
                      <Image
                        src={
                          user?.avatar
                            ? user?.avatar?.url
                            : "/defaultProfile.png"
                        }
                        alt="Avatar"
                        width={38}
                        height={38}
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          borderRadius: "50%",
                          cursor: "pointer",
                          border:
                            activeItem === 5 ? "2px solid #37a39a" : "none",
                        }}
                      />
                    </Link>
                  </>
                ) : (
                  <HiOutlineUserCircle
                    className=" cursor-pointer hidden 800px:block dark:text-white text-black px-2"
                    size="45"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
              {/* Nav Items */}
              <div className="mt-[-2rem]">
                <NavItems activeItem={activeItem} isMobile={true} />
              </div>
              <br />
              <br />
              <p className="text-[14px] font-medium sm:text-[16px] text-center text-black px-3 pl-5 dark:text-white">
                Copyright &copy; 2024 EULearning
              </p>
            </div>
          </div>
        )}
      </div>

      {route === "Login" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "Sign-Up" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {/* Verification */}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
