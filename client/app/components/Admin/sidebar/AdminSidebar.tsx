import React, { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { signOut } from "next-auth/react";
import "react-pro-sidebar/dist/css/styles.css";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  SettingsIcon,
  ExitToAppIcon,
} from "./Icon";
import { useSelector } from "react-redux";
import Link from "next/link.js";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useLogOutQuery } from "../../../../redux/features/auth/authApi";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

// AdminSidebar

const AdminSidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, () => {
    skip: !logout ? true : false;
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111C43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme === "dark" ? "#fff" : "#000"}`,
        },
      }}
      className="!bg-white dark:bg-gray-900"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "12%",
        }}
      >
        <Menu iconShape="square">
          {/* Logo & Menu Icons */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{ margin: "10px 0px 20px 0px" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems=" center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[22px] font-semibold font-Poppins uppercase dark:text-white text-black">
                    <span className="text-purple-700">EU</span>Learning
                  </h3>
                </Link>
                <IconButton
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="inline-block "
                >
                  <ArrowBackIosIcon className="text-black dark:text-white" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" alignItems="center" justifyContent="center">
                <div className=" relative w-[100px] h-[100px] rounded-full overflow-hidden">
                  <Image
                    alt="Profile-logo"
                    fill
                    src={
                      user?.avatar ? user?.avatar?.url : "/defaultProfile.png"
                    }
                    style={{
                      cursor: "pointer",
                      borderRadius: "50%",
                      border: "2px solid #5b6fe6",
                    }}
                  />
                </div>
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className="!text-[20px] font-Poppins text-black dark:text-white"
                  sx={{ m: "10px 0 0 0 " }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  className="!text-[20px] font-medium font-Poppins capitalize text-black dark:text-white"
                  sx={{ m: "10px 0 0 0 " }}
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] font-Poppins capitalize text-black !font-[400] dark:text-white"
              sx={{ m: "10px 0 0 0 " }}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users"
              to="/admin/users"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Invoices"
              to="/admin/invoices"
              icon={<GroupsIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] font-Poppins capitalize text-black !font-[400] dark:text-white"
              sx={{ m: "10px 0 0 0 " }}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Courses"
              to="/admin/create-course"
              icon={<VideoCallIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Live Courses"
              to="/admin/courses"
              icon={<OndemandVideoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] font-Poppins capitalize text-black !font-[400] dark:text-white"
              sx={{ m: "10px 0 0 0 " }}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            <Item
              title="Hero"
              to="/admin/hero"
              icon={<WebIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ's"
              to="/admin/faq"
              icon={<QuizIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              icon={<WysiwygIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] font-Poppins capitalize text-black !font-[400] dark:text-white"
              sx={{ m: "10px 0 0 0 " }}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] font-Poppins capitalize text-black !font-[400] dark:text-white"
              sx={{ m: "10px 0 0 0 " }}
            >
              {!isCollapsed && "Courses Analytics"}
            </Typography>
            <Item
              title="Courses Analytics"
              to="/admin/course-analytics"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Orders Analytics"
              to="/admin/orders-analytics"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users Analytics"
              to="/admin/users-analytics"
              icon={<ManageHistoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              className="!text-[20px] font-Poppins capitalize text-black !font-[400] dark:text-white"
              sx={{ m: "10px 0 0 0 " }}
            >
              {!isCollapsed && "Extras"}
            </Typography>
            {/* <Item
              title="Settings"
              to="/admin/settings"
              icon={<SettingsIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Logout"
              to="/"
              icon={<ExitToAppIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
