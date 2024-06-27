"use client";
import Heading from "../../utils/Heading";
import AdminProtected from "../../hooks/adminProtected";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import DashboardHero from "../../components/Admin/DashboardHero";
import AllCourses from "../../components/Admin/Course/AllCourses";

type Props = {};

const Courses = (props: Props) => {
  return (
    <div className="w-full min-h-screen text-black dark:text-white">
      <AdminProtected>
        <Heading
          title="EUlearning - Admin"
          description="EUlearning is a platform for student to learn & get help from teachers."
          keywords="Programming , MERN Stack , Redux, Contaxt API"
        />
        <div className="flex h-screen">
          <div className="1500px:w-[12%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <AllCourses />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Courses;
