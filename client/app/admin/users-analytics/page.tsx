"use client";
import Heading from "../../utils/Heading";
import AdminProtected from "../../hooks/adminProtected";
import React from "react";
import UserAnalytics from "../../components/Admin/Analytics/UserAnalytics";
import AdminLayout from "@/app/components/Admin/sidebar/AdminLayout";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="w-full min-h-screen dark:bg-gray-900 text-black dark:text-white">
      <AdminProtected>
        <Heading
          title="EUlearning - Admin"
          description="EUlearning is a platform for students to learn & get help from teachers."
          keywords="Programming, MERN Stack, Redux, Context API"
        />
        <AdminLayout>
          <UserAnalytics />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default Page;
