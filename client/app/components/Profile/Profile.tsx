"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useRouter } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import { useLogOutMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import EnrolledCourses from "./EnrolledCourses";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const router = useRouter();
  const [avatar, setAvatar] = useState(
    user?.avatar?.url ? user?.avatar?.url : ""
  );
  const [active, setActive] = useState(1);
  const [logOut, { isSuccess, error }] = useLogOutMutation();
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const [courses, setCourses] = useState<any>([]);

  //   Logout Handler
  const logoutHandler = async () => {
    await logOut();
    router.push("/");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout successfully!");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  // User Courses

  useEffect(() => {
    if (data) {
      const filterCourses = user?.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);

      setCourses(filterCourses);
    }
    // eslint-disable-next-line
  }, [data]);
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
      {/* Change Password */}
      {active === 2 && (
        <div className="w-full h-full mt-[4.5rem] bg-transparent  px-4 ">
          <ChangePassword />
        </div>
      )}
      {/* Enrolled Courses */}
      {active === 3 && (
        <div className="w-full h-full mt-[4.5rem] bg-transparent  px-4 ">
          <EnrolledCourses courses={courses} />
        </div>
      )}
    </div>
  );
};

export default Profile;
