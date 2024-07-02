"use client";
import Heading from "../../utils/Heading";
import AdminProtected from "../../hooks/adminProtected";
import React from "react";
import AllCourses from "../../components/Admin/Course/AllCourses";
import AdminLayout from "@/app/components/Admin/sidebar/AdminLayout";

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
        <AdminLayout>
          <AllCourses />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default Courses;
