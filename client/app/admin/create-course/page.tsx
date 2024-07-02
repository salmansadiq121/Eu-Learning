"use client";
import React from "react";
import Heading from "../../utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import AdminLayout from "@/app/components/Admin/sidebar/AdminLayout";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="EULearning - Create-Course"
        description="EUlearning is a plateform for students to learn programming & skills"
        keywords="EUlearning Mern Stack JavaScript CSS Tailwind CSS"
      />
      <AdminLayout>
        <div className="flex w-full dark:text-white dark:bg-gray-900 bg-white text-black">
          <CreateCourse />
        </div>
      </AdminLayout>
    </>
  );
};

export default page;
