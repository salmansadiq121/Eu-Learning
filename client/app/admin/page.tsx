"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import DashboardHero from "../components/Admin/DashboardHero";

type Props = {};

const Admin = (props: Props) => {
  return (
    <div className="w-full min-h-screen dark:text-white text-black overflow-x-hidden">
      <AdminProtected>
        <Heading
          title="EUlearning - Admin"
          description="EUlearning is a platform for student to learn & get help from teachers."
          keywords="Programming , MERN Stack , Redux, Contaxt API"
        />
        <div className="flex">
          <div className="1500px:w-[12%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Admin;
