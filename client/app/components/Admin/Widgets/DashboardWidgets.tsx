import React, { FC } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";

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
  return (
    <div className="mt-[3.5rem]  min-h-screen">
      <div className="flex flex-1">
        <div className="p-4 flex-1 sm:flex-[.8] rounded-md overflow-hidden">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-4 sm:pr-8 flex-1 sm:flex-[.3]">
          <div className="w-full dark:bg-[#111C43] bg-gray-200 border shadow rounded-sm">
            <div className="flex items-center justify-between p-5">
              <div>
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  120
                </h5>
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4">+120%</h5>
              </div>
            </div>
          </div>
          <div className="w-full dark:bg-[#111C43] bg-gray-200 border shadow rounded-sm my-8">
            <div className="flex items-center justify-between p-5">
              <div>
                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  450
                </h5>
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={100} open={open} />
                <h5 className="text-center pt-4">+150%</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="flex flex-1 mt-[-20px]">
        <div className="dark:bg-[#111c43] bg-gray-200 rounded-md flex-1 sm:flex-[.7]  w-[94%] mt-[2rem] h-[75vh] shadow-sm m-auto">
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
