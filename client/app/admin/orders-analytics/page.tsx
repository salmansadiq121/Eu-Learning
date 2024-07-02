"use client";
import Heading from "../../utils/Heading";
import AdminProtected from "../../hooks/adminProtected";
import React from "react";
import OrderAnalytics from "../../components/Admin/Analytics/OrderAnalytics";
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
          <OrderAnalytics />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default Page;
