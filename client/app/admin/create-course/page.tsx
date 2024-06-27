"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../components/Admin/DashboardHeader";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="EULearning - Create-Course"
        description="EUlearning is a plateform for students to learn programming & skills"
        keywords="EUlearning Mern Stack JavaScript CSS Tailwind CSS"
      />
      <div className="flex dark:text-white dark:bg-gray-900 bg-white text-black">
        <div className="1500px:w-[12%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[87%]">
          <DashboardHeader />
          <CreateCourse />
        </div>
      </div>
    </>
  );
};

export default page;
