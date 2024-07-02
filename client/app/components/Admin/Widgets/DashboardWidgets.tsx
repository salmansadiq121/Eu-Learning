import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticsQuery,
  useGetUsersAnalyticsQuery,
} from "../../../../redux/features/analytics/analyticsApi";
import CircularProgressWithLabels from "./CircularProgressWithLabels";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open, value }) => {
  const [userComparePercentage, setUserComparePercentage] = useState<any>();
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const { data, isLoading: userLoading } = useGetUsersAnalyticsQuery({});
  const { data: orderData, isLoading: orderLoading } =
    useGetOrdersAnalyticsQuery({});

  console.log("dashboard:", orderComparePercentage, userComparePercentage);

  useEffect(() => {
    if (!userLoading && !orderLoading && data && orderData) {
      const usersLastTwoMonths = data.users.last12Months.slice(-2);
      const orderLastTwoMonths = orderData.orders.last12Months?.slice(-2);

      if (usersLastTwoMonths.length === 2 && orderLastTwoMonths.length === 2) {
        const userCurrentMonth = usersLastTwoMonths[1].count;
        const userPrevMonth = usersLastTwoMonths[0].count;
        const orderCurrentMonth = orderLastTwoMonths[1].count;
        const orderPrevMonth = orderLastTwoMonths[0].count;

        const usersPercentageChange =
          userPrevMonth !== 0
            ? ((userCurrentMonth - userPrevMonth) / userPrevMonth) * 100
            : 100;
        const orderPercentageChange =
          orderPrevMonth !== 0
            ? ((orderCurrentMonth - orderPrevMonth) / orderPrevMonth) * 100
            : 100;

        setUserComparePercentage({
          currentMonth: userCurrentMonth,
          prevMonth: userPrevMonth,
          percentChange: usersPercentageChange,
        });

        setOrderComparePercentage({
          currentMonth: orderCurrentMonth,
          prevMonth: orderPrevMonth,
          percentChange: orderPercentageChange,
        });
      }
    }
  }, [userLoading, orderLoading, data, orderData]);

  return (
    <div className="mt-[3.5rem]  min-h-screen">
      <div className="flex flex-1 ">
        <div className="p-4 flex-1 sm:flex-[.8] items-start rounded-md overflow-hidden">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-4 sm:pr-8 flex-1 sm:flex-[.3]">
          <div className="w-full dark:bg-[#111C43] bg-gray-200 border shadow rounded-sm">
            <div className="flex items-center justify-between p-5">
              <div>
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {orderComparePercentage?.currentMonth}
                </h5>
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    orderComparePercentage?.percentChange > 0
                      ? 100
                      : orderComparePercentage?.percentChange
                  }
                  open={open}
                />
                <h5 className="text-center pt-4">
                  {orderComparePercentage &&
                    orderComparePercentage?.percentChange !== undefined && (
                      <>
                        {orderComparePercentage.percentChange > 0 ? (
                          <span className="text-green-500 flex gap-[2px]">
                            +{orderComparePercentage?.percentChange.toFixed(2)}{" "}
                            %
                          </span>
                        ) : (
                          <span className="text-red-600 flex gap-[2px]">
                            {orderComparePercentage?.percentChange.toFixed(2)} %
                          </span>
                        )}
                      </>
                    )}
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full dark:bg-[#111C43] bg-gray-200 border shadow rounded-sm my-8">
            <div className="flex items-center justify-between p-5">
              <div>
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel
                  value={
                    userComparePercentage?.percentChange > 0
                      ? 100
                      : userComparePercentage?.percentChange
                  }
                  open={open}
                />

                <h5 className="text-center pt-4">
                  {userComparePercentage &&
                    userComparePercentage.percentChange !== undefined && (
                      <>
                        {userComparePercentage.percentChange > 0 ? (
                          <span className="text-green-500 flex gap-[2px]">
                            +{userComparePercentage.percentChange.toFixed(2)} %
                          </span>
                        ) : (
                          <span className="text-red-600 flex gap-[2px]">
                            {userComparePercentage.percentChange.toFixed(2)} %
                          </span>
                        )}
                      </>
                    )}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="flex flex-1 mt-[-20px]">
        <div className="dark:bg-[#111c43] bg-gray-200 rounded-md flex-1 sm:flex-[.7]  w-[94%] mt-[2rem] h-[80vh] shadow-sm m-auto">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5 flex-1 sm:flex-[.4]">
          <h5 className="dark:text-white text-[20px] font-[400] text-black">
            Resent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
