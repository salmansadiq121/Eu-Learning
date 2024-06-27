"use client";
import Heading from "../../utils/Heading";
import AdminProtected from "../../hooks/adminProtected";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import AllInvoices from "../../components/Admin/Order/AllInvoices";

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
        <div className="flex">
          <div className="1500px:w-[12%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-4/5 flex flex-col">
            <DashboardHeader />
            <AllInvoices />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
