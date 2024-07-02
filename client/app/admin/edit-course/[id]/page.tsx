"use client";
import AdminLayout from "@/app/components/Admin/sidebar/AdminLayout";
import EditCourse from "../../../components/Admin/Course/EditCourse";
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

        <AdminLayout>
          <EditCourse id={id} />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default page;
