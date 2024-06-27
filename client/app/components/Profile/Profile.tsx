"use client";
import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(
    user?.avatar?.url ? user?.avatar?.url : ""
  );
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, () => {
    skip: !logout ? true : false;
  });

  //   Logout Handler
  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[99%] sm:w-[85%]  flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px]  dark:bg-slate-900  bg-opacity-90 border dark:border-[#fffff1d] border-gray-300 overflow-hidden rounded-md shadow-md shadow-gray-300 dark:shadow-gray-800 mt-[80px] mb-[80px]  sticky ${
          scroll ? "top-[120px]" : "top-[30px]]"
        } left-[.5rem] sm:left-[30px] `}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {/* Profile */}
      {active === 1 && (
        <div className="w-full h-full mt-[4.5rem] bg-transparent  px-4 ">
          <ProfileInfo avatar={user?.avatar?.url} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full mt-[4.5rem] bg-transparent  px-4 ">
          <ChangePassword />
        </div>
      )}
    </div>
  );
};

export default Profile;
