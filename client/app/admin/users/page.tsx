"use client";
import Heading from "../../utils/Heading";
import AdminProtected from "../../hooks/adminProtected";
import React from "react";
import AllUsers from "../../components/Admin/Users/AllUsers";
import AdminLayout from "@/app/components/Admin/sidebar/AdminLayout";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full min-h-screen text-black dark:bg-gray-900 dark:text-white">
      <AdminProtected>
        <Heading
          title="EUlearning - Admin"
          description="EUlearning is a platform for student to learn & get help from teachers."
          keywords="Programming , MERN Stack , Redux, Contaxt API"
        />

        <AdminLayout>
          <AllUsers isTeam={false} />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default page;
