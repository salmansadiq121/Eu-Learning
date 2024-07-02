"use client";
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { useMediaQuery } from "react-responsive";
import DashboardHeader from "../DashboardHeader";

interface Props {
  children: any;
}

const AdminLayout = ({ children }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(false);
    }
  }, [isMobile]);

  return (
    <div className="flex">
      <div
        className={`${
          isCollapsed ? "w-16" : "w-1/5"
        } transition-all duration-300`}
      >
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "w-[calc(100%-6rem)]" : "w-[80%]"
        } ml-auto`}
      >
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
