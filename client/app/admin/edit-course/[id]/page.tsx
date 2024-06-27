"use client";
import EditCourse from "../../../components/Admin/Course/EditCourse";
import DashboardHero from "../../../components/Admin/DashboardHero";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../../../hooks/adminProtected";
import Heading from "../../../utils/Heading";
import React from "react";

type Props = {};

const page = ({ params }: any) => {
  const id = params.id;

  return (
    <div className="w-full min-h-screen text-black dark:text-white dark:bg-gray-900">
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
            <EditCourse id={id} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
