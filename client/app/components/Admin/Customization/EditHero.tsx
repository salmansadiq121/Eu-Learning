import { style } from "@/app/styles/style";
import {
  useGetHeroDataQuery,
  useUpdateLayoutMutation,
} from "../../../../redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import toast from "react-hot-toast";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [updateLayout, { isLoading, isSuccess, error }] =
    useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image.url);
    }

    if (isSuccess) {
      refetch();
      toast.success("Banner updated!");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
    //eslint-disable-next-line
  }, [data, isSuccess, error]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await updateLayout({
      type: "Banner",
      image: image,
      title: title,
      subTitle: subTitle,
    });
  };

  const isBannerChanged =
    data?.layout?.banner?.title !== title ||
    data?.layout?.banner?.subTitle !== subTitle ||
    data?.layout?.banner?.url?.image !== image;

  return (
    <>
      <div className="w-full  1000px:flex items-center mt-[4rem] p-4">
        <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1100px:h-[500px] 1100px:w-[500px]">
          {" "}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <div
                className="relative w-[20rem]  sm:w-[25rem] h-[20rem] sm:h-[25rem] rounded-full object-contain  overflow-hidden p-[2rem]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(0, 169, 247, 0.5), rgba(0, 169, 247, 0.3), rgba(0, 169, 247, 0.1))",
                }}
              >
                <Image
                  src={image}
                  alt="Banner"
                  fill
                  className="w-full h-full rounded-full object-contain"
                />
              </div>
              <input
                type="file"
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-[2rem] right-[4rem] z-[10]"
              >
                <AiOutlineCamera className="text-black dark:text-white text-[18px]  cursor-pointer" />
              </label>
            </div>
          </div>
          <div className=" w-full flex flex-col gap-4 items-start text-start">
            <textarea
              placeholder="Improve Your Unline Learning Experience Better Instantly."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              rows={3}
              className={`dark:text-white  text-black text-[30px] font-bold w-full 1000px:text-[50px] 1500px:text-[60px] resize-none border-none bg-transparent outline-none`}
            />
            <textarea
              placeholder="We have 40k+ Online courses & 500k+ Online registered students. Find your desired Courses from them."
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              className={`dark:text-white text-black text-[18px] font-[500] resize-none font-Josefin w-[100%] sm:w-[75%] bg-transparent border-none outline-none`}
              rows={4}
            />
            <br />
            <div className="flex items-center justify-end w-full px-3 sm:px-6">
              <button
                className={`${
                  style.button
                } !w-[100px] !min-h-[38px] flex items-center mr-4 justify-center !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                  isBannerChanged
                    ? "!cursor-pointer !bg-[#42d383]"
                    : "cursor-not-allowed"
                } !rounded  `}
                onClick={isBannerChanged ? handleEdit : () => null}
              >
                {isLoading ? (
                  <BiLoaderCircle className="w-4 h-4 animate-spin text-black dark:text-white" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
