import React from "react";
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

import { useGetCourseAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import Loader from "@/app/utils/Loader";

type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading } = useGetCourseAnalyticsQuery({});

  //   const analyticsData = [
  //     { name: "Jun 2024", uv: 3 },
  //     { name: "Jun 2024", uv: 5 },
  //     { name: "Jun 2024", uv: 6 },
  //     { name: "Jun 2024", uv: 2 },
  //     { name: "Jun 2024", uv: 9 },
  //   ];

  const analyticsData: any = [];

  data?.courses?.last12Months.forEach((item: any) => {
    analyticsData.push({ name: item?.month, uv: item?.count });
  });
  console.log("Analytics Data:", analyticsData);
  const minValue = 0;
  return (
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
  );
};

export default CourseAnalytics;
