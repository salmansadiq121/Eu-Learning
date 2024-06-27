import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { MdOutlineEmail } from "react-icons/md";
import { format } from "timeago.js";
import Loader from "../../../utils/Loader";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateRoleMutation,
} from "../../../../redux/features/user/userApi";
import { style } from "../../../styles/style";
import toast from "react-hot-toast";
import DeletePopup from "../../../utils/DeletePopup";

type Props = {
  isTeam: Boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState("");
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [updateRole, { isSuccess, error: iserror }] = useUpdateRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  // Delete User
  const confirmDelete = (id: any) => {
    setUserId(id);
    setShowModal(true);
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Role updated successfully!");
    }

    if (iserror) {
      if ("data" in iserror) {
        const errorMessage = iserror as any;
        toast.error(errorMessage.data.message);
      }
    }
    //eslint-disable-next-line
  }, [isSuccess, iserror]);

  useEffect(() => {
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }

    //eslint-disable-next-line
  }, [deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    {
      field: "role",
      headerName: "Role",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <select
              value={params.row.role}
              onChange={(e: any) =>
                updateRole({ id: params.row.id, role: e.target.value })
              }
              className="w-full h-full bg-transparent cursor-pointer dark:bg-gray-800 outline-none"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </>
        );
      },
    },
    { field: "courses", headerName: "Purchased Courses", flex: 0.2 },
    { field: "createdAt", headerName: "Join At", flex: 0.3 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              title="Delete User"
              onClick={() => confirmDelete(params.row.id)}
            >
              <AiOutlineDelete
                className="text-red-500 hover:text-red-600 cursor-pointer"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a
              href={`mailto:${params.row.email}`}
              title={`Send mail to ${params.row.email}`}
              target="blank"
              className=""
            >
              <MdOutlineEmail
                className="text-black dark:text-white cursor-pointer mt-4"
                size={20}
              />
            </a>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData?.forEach((item: any, index: any) => {
        if (item) {
          const fileObject = {
            id: item._id,
            name: item?.name,
            email: item?.email,
            role: item?.role,
            courses: item?.courses.length,
            createdAt: format(item?.createdAt),
          };

          rows.push(fileObject);
        }
      });
  } else {
    data &&
      data?.users?.forEach((item: any, index: any) => {
        if (item) {
          const fileObject = {
            id: item._id,
            name: item?.name,
            email: item?.email,
            role: item?.role,
            courses: item?.courses.length,
            createdAt: format(item?.createdAt),
          };

          rows.push(fileObject);
        }
      });
  }

  return (
    <div className="mt-[120px] dark:bg-gray-900 pb-[3rem]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                background: "transparent",
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
                borderBottom: "none",
                //   background: theme === "dark" ? "#222" : "#fff",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders   ": {
                backgroundColor: theme === "dark" ? "#3e4396 " : "#A4A9FC ",

                //   color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1f2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? "#b7ebde !important" : "#000 !important",
              },
              "& .MuiDataGrid--toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              //   class="light:text-black dark:text-white "
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 6 },
                },
              }}
              pageSizeOptions={[5, 10, 20, 50]}
              checkboxSelection
            />
          </Box>
        </Box>
      )}

      <DeletePopup
        show={showModal}
        setShow={setShowModal}
        did={userId}
        deleteFun={deleteUser}
        title="Confirm to Delete"
        message="Are you sure you want to delete this User?"
      />
    </div>
  );
};

export default AllUsers;
