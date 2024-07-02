import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import Loader from "../../../utils/Loader";
import toast from "react-hot-toast";
import DeletePopup from "../../../utils/DeletePopup";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme();
  const [showModal, setShowModal] = useState(false);
  const { isLoading, data, error, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [courseId, setCourseId] = useState("");
  const [deleteCourse, { isSuccess, error: deleteError }] =
    useDeleteCourseMutation();

  const confirmDelete = (id: any) => {
    setCourseId(id);
    setShowModal(true);
  };

  // Delete Course
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course delete successfully!");
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }

    //eslint-disable-next-line
  }, [isSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.4 },
    { field: "purchased", headerName: "Purchased", flex: 0.4 },
    { field: "created_at", headerName: "Created At", flex: 0.4 },
    {
      field: " ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button>
              <Link href={`/admin/edit-course/${params.row.id}`}>
                <MdOutlineModeEditOutline
                  className="text-black dark:text-white cursor-pointer"
                  size={20}
                />
              </Link>
            </Button>
          </>
        );
      },
    },

    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button onClick={() => confirmDelete(params.row.id)}>
              <AiOutlineDelete
                className="text-red-500 hover:text-red-600 cursor-pointer"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];

  //   if (data && data?.isArray(data)) {
  data &&
    data?.courses?.forEach((item: any, index: any) => {
      if (item) {
        // const formattedDate = format(new Date(item?.createdAt), "dd-MM-yyyy");
        const fileObject = {
          id: item._id,
          title: item?.name,
          ratings: item?.ratings,
          purchased: item?.purchased,
          created_at: format(item?.createdAt),
        };

        rows.push(fileObject);
      }
    });
  //   }
  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="75vh"
            // width="98%"
            // boxShadow=".3rem .3rem .4rem rgba(0,0,0,.3)"
            // overflow={"auto"}
            // className="overflow-auto message min-w-[44rem] sm:block"
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
                borderBottom: "none!important",
                //   background: theme === "dark" ? "#222" : "#fff",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders   ": {
                backgroundColor: theme === "dark" ? "#3e4396 " : "#A4A9FC ",

                // color: theme === "dark" ? "#fff" : "#000",
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
        did={courseId}
        deleteFun={deleteCourse}
        title="Confirm to Delete"
        message="Are you sure you want to delete this course?"
      />
    </div>
  );
};

export default AllCourses;
