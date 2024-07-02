"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";
import AdminLayout from "../components/Admin/sidebar/AdminLayout";

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
        <AdminLayout>
          <DashboardHero isDashboard={true} />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default Admin;
