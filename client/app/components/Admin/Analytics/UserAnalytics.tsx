import React, { FC } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../../utils/Loader";
import { useGetUsersAnalyticsQuery } from "../../../../redux/features/analytics/analyticsApi";

type Props = {
  isDashboard?: boolean;
};

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data?.users?.last12Months?.map((item: any) => {
      analyticsData.push({ name: item?.month, count: item?.count });
    });

  return (
    <div
      className={`w-full ${
        isDashboard
          ? "dark:bg-[#111C43] bg-gray-200 rounded-md h-[68vh]"
          : "dark:bg-gray-900  min-h-screen"
      }   dark:text-white text-black mt-[3.5rem] p-4`}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-full w-full">
          <div className=" flex flex-col gap-2">
            <h1
              className="text-2xl text-black dark:text-white sm:text-3xl font-semibold"
              style={{
                textShadow: "-.1px 1px 0px #ccc",
              }}
            >
              Users Analytics
            </h1>
            {!isDashboard && (
              <p className="text-[15px]">Last 12 months analytics data</p>
            )}
          </div>
          {!isDashboard && <hr className="my-3 h-[2px] bg-gray-300" />}

          <div
            className={`w-full ${
              isDashboard ? "h-[60vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "97%"}
              height={isDashboard ? "100%" : "80%"}
            >
              <ComposedChart
                data={analyticsData}
                width={500}
                height={400}
                margin={{
                  top: 20,
                  right: 80,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke={"#4d62d9"} />
                <XAxis
                  dataKey="name"
                  label={{
                    value: "Pages",
                    position: "insideBottomRight",
                    offset: 0,
                  }}
                  scale="band"
                />
                <YAxis
                  label={{
                    value: "Index",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill={"#4d62d9"}
                />
                <Bar dataKey="count" barSize={20} fill={"#4d62d9"} />
                <Line type="monotone" dataKey="count" stroke={"#4d62d9"} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAnalytics;
