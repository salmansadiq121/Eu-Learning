import React, { useEffect, useState } from "react";
import {
  useGetHeroDataQuery,
  useUpdateLayoutMutation,
} from "../../../../redux/features/layout/layoutApi";
import toast from "react-hot-toast";
import Loader from "../../../utils/Loader";
import { style } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { TbLoader2 } from "react-icons/tb";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, refetch, isLoading } = useGetHeroDataQuery("Category", {
    refetchOnMountOrArgChange: true,
  });
  const [updateLayout, { isLoading: updateLoading, isSuccess, error }] =
    useUpdateLayoutMutation();
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Category updated!");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }

    //   eslint-disable-next-line
  }, [isSuccess, error]);

  const handleCategoryAdd = async (id: any, value: any) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty!");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const editCategoryHandler = async () => {
    await updateLayout({
      type: "Category",
      categories,
    });
  };
  return (
    <div className="w-full min-h-screen dark:bg-gray-900 text-black dark:text-white mt-[3.5rem] pb-8">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="">
          <h3 className="text-2xl font-[600] ">All Categories</h3>
          <hr className="my-3 h-[1px] bg-gray-300" />
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categories &&
              categories?.map((item: any, index: any) => {
                return (
                  <div className="p-3" key={index}>
                    <div className="flex items-center justify-center w-full border-b-2 border-gray-400">
                      <input
                        type="text"
                        className={`${style.input} !w-[unset] !border-none  !text-[20px]`}
                        value={item?.title}
                        onChange={(e) =>
                          handleCategoryAdd(item._id, e.target.value)
                        }
                        placeholder="Enter category title..."
                      />
                      <AiOutlineDelete
                        className="text-black dark:text-white text-[18px] cursor-pointer"
                        onClick={() => {
                          setCategories((prevCategory: any) =>
                            prevCategory.filter((i: any) => i._id !== item._id)
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <br /> <br />
      <div className="flex items-center w-full">
        <IoMdAddCircleOutline
          className="h-6 w-6 cursor-pointer text-black dark:text-white"
          onClick={newCategoriesHandler}
        />
      </div>
      <div className="w-[98%] sm:w-[96%] flex items-center justify-end ">
        <div
          className="flex bg-[#42d383] items-center justify-center w-[7rem] h-[2.6rem] cursor-pointer rounded-3xl text-[16px] text-white hover:scale-[1.01] hover:shadow-2xl"
          onClick={editCategoryHandler}
        >
          {updateLoading ? (
            <TbLoader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            "Update"
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCategories;
