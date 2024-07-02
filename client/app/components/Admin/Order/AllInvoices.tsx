import { useGetAllOrdersQuery } from "../../../../redux/features/orders/orderApi";
import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import Loader from "../../../utils/Loader";
import { format } from "timeago.js";
import { AiOutlineMail } from "react-icons/ai";
import { useGetAllCoursesQuery } from "../../../../redux/features/courses/coursesApi";
import { useGetAllUsersQuery } from "../../../../redux/features/user/userApi";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme } = useTheme();
  const { data, isLoading } = useGetAllOrdersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const [ordersData, setOrdersData] = useState<[]>([]);

  console.log("OrderData:", ordersData);

  useEffect(() => {
    if (data) {
      const temp = data?.orders.map((item: any) => {
        const user = usersData?.users.find(
          (user: any) => user?._id === item?.userId
        );
        const course = coursesData?.courses.find(
          (course: any) => course?._id === item?.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrdersData(temp);
    }
  }, [data, coursesData, usersData]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.4 : 0.4 },
    ...(isDashboard
      ? []
      : [
          {
            field: "email",
            headerName: "Email",
            flex: 0.6,
          },
          {
            field: "title",
            headerName: "Course Title",
            flex: 0.5,
          },
        ]),
    { field: "price", headerName: "Price", flex: 0.4 },

    ...(isDashboard
      ? [{ field: "createdAt", headerName: "Create At", flex: 0.4 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.email}`}>
                  <AiOutlineMail
                    size={20}
                    className=" text-black mt-[1rem] dark:text-white"
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  ordersData &&
    ordersData.forEach((item: any) => {
      rows.push({
        id: item?._id,
        userName: item?.userName,
        email: item?.userEmail,
        title: item?.title,
        price: item?.price,
        createdAt: format(item.createdAt),
      });
    });
  return (
    <div className={`${isDashboard ? "mt-[0px]" : "mt-[5rem]"} message`}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "76vh" : "80vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders   ": {
                backgroundColor: theme === "dark" ? "#111C43 " : "#A4A9FC ",
                // color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#111C43" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#fff !important" : "#000 !important",
              },
              "& .MuiDataGrid--toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              //   components={isDashboard ? {} : { Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
