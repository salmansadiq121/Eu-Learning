"use client";
import Heading from "../../utils/Heading";
import AdminProtected from "../../hooks/adminProtected";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import DashboardHeader from "../../components/Admin/DashboardHeader";
import { useGetCourseAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Label,
  LabelList,
  YAxis,
} from "recharts";
import Loader from "@/app/utils/Loader";

type Props = {};

const Page = (props: Props) => {
  const { data, isLoading } = useGetCourseAnalyticsQuery({});

  const analyticsData: any = [];

  data?.courses?.last12Months.forEach((item: any) => {
    analyticsData.push({ name: item?.month, uv: item?.count });
  });
  console.log("Analytics Data:", analyticsData);
  const minValue = 0;
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
            <div className="w-full min-h-screen dark:bg-gray-900 dark:text-white text-black mt-[3.5rem] px-2">
              {isLoading ? (
                <Loader />
              ) : (
                <div className="h-full w-full">
                  <div className="flex flex-col gap-2">
                    <h1
                      className="text-2xl sm:text-3xl text-black dark:text-white font-semibold"
                      style={{
                        textShadow: "-.1px 1px 0px #ccc",
                      }}
                    >
                      Courses Analytics
                    </h1>
                    <p className="text-[15px]">Last 12 months analytics data</p>
                  </div>
                  <hr className="my-3 h-[2px] bg-gray-300" />

                  <div className="w-full h-[90%] flex items-center justify-center">
                    <ResponsiveContainer width="90%" height="60%">
                      <BarChart width={150} height={300} data={analyticsData}>
                        <XAxis dataKey="name">
                          <Label offset={0} position="insideBottom" />
                        </XAxis>
                        <Tooltip />
                        <YAxis domain={[minValue, "auto"]} />
                        <Bar dataKey="uv" fill="#3faf82">
                          <LabelList dataKey="uv" position="top" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
