"use client";
import Heading from "../../utils/Heading";
import AdminProtected from "../../hooks/adminProtected";
import React from "react";
import EditFaq from "../../components/Admin/Customization/EditFaq";
import AdminLayout from "@/app/components/Admin/sidebar/AdminLayout";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full min-h-screen dark:bg-gray-900 text-black dark:text-white">
      <AdminProtected>
        <Heading
          title="EUlearning - Admin"
          description="EUlearning is a platform for student to learn & get help from teachers."
          keywords="Programming , MERN Stack , Redux, Contaxt API"
        />
        <AdminLayout>
          <EditFaq />
        </AdminLayout>
      </AdminProtected>
    </div>
  );
};

export default page;
